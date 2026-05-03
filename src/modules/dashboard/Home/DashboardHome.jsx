import React, { useState, useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import ComponentLoader from "../../../pages/ComponentLoader";
import { formatDateDDMonYYYY } from "../../../utils/dateFormat";

const DashboardHome = () => {
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light",
  );
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      setCurrentTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-order-list`,
        );
        setOrderList(response.data?.list_data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
    return () => observer.disconnect();
  }, []);

  // Use explicit colors for ApexCharts as it sometimes struggles with CSS variables in SVG
  const textColor = currentTheme === "dark" ? "#E2E8F0" : "#1E293B";
  const borderColor =
    currentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  // ================= DATA PROCESSING =================
  const processedData = useMemo(() => {
    if (!orderList.length) return null;

    // 1. Line/Area Chart: Revenue by Date
    const revenueByDate = {};
    orderList.forEach((order) => {
      const date = order.order_date;
      const amount = parseFloat(order.total_amount) || 0;
      revenueByDate[date] = (revenueByDate[date] || 0) + amount;
    });

    const sortedDates = Object.keys(revenueByDate).sort();
    const formattedDates = sortedDates.map((date) => formatDateDDMonYYYY(date));
    const lineSeries = [
      {
        name: "Revenue",
        data: sortedDates.map((date) => revenueByDate[date].toFixed(2)),
      },
    ];

    // 2. Bar Chart: Monthly Growth (Order Count)
    const monthlyOrders = {};
    orderList.forEach((order) => {
      const month = new Date(order.order_date).toLocaleString("default", {
        month: "short",
      });
      monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const barSeries = [
      {
        name: "Orders",
        data: months.map((m) => monthlyOrders[m] || 0),
      },
    ];

    // 3. Donut Chart: Revenue (10% of Category Sales)
    const categorySales = {};
    orderList.forEach((order) => {
      order.order_list?.forEach((item) => {
        const cat =
          item.cat_name || item.category || item.par_cat_name || "General";
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 0;
        categorySales[cat] = (categorySales[cat] || 0) + price * qty;
      });
    });

    const donutLabels = Object.keys(categorySales);
    // Apply 10% revenue multiplier for the pie chart
    const donutSeries = Object.values(categorySales).map((val) =>
      parseFloat((val * 0.1).toFixed(2)),
    );

    // 4. Stats
    const totalSubtotal = orderList.reduce(
      (sum, order) => sum + (parseFloat(order.sub_total) || 0),
      0,
    );
    const totalVat = orderList.reduce(
      (sum, order) => sum + (parseFloat(order.vat_total) || 0),
      0,
    );
    const totalShipping = orderList.reduce(
      (sum, order) => sum + (parseFloat(order.shipping) || 0),
      0,
    );
    const grossSales = totalSubtotal + totalShipping + totalVat;
    const netRevenue = grossSales * 0.1;
    const otherBalance = grossSales - netRevenue - totalVat - totalShipping;

    const pendingOrders = orderList.filter(
      (order) => order.order_status === "P",
    ).length;
    const completedOrders = orderList.filter(
      (order) => order.order_status === "C",
    ).length;

    return {
      lineSeries,
      sortedDates,
      formattedDates,
      barSeries,
      months,
      donutLabels,
      donutSeries,
      financialSeries: [netRevenue, otherBalance, totalVat, totalShipping],
      financialLabels: [
        "Net Revenue (10%)",
        "Subtotal Remnant",
        "VAT Total",
        "Shipping Cost",
      ],
      totalSales: grossSales,
      totalVat,
      pendingOrders,
      completedOrders,
    };
  }, [orderList]);

  const lineChartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
      foreColor: textColor,
      background: "transparent",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    theme: { mode: currentTheme },
    colors: ["#22d3ee"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 4 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    title: {
      text: "Revenue Trend",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "900",
        fontFamily: "inherit",
        color: textColor,
      },
    },
    markers: {
      size: 5,
      colors: ["#22d3ee"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 5,
    },
    xaxis: {
      categories: processedData?.formattedDates || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: textColor } },
    },
    yaxis: {
      labels: {
        style: { colors: textColor },
        formatter: (val) => "$" + val,
      },
    },
    tooltip: { theme: currentTheme },
  };

  const barChartOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
      foreColor: textColor,
      background: "transparent",
    },
    theme: { mode: currentTheme },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        distributed: true,
        borderRadius: 8,
        dataLabels: { position: "top" },
      },
    },
    colors: [
      "#FF4560",
      "#775DD0",
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
      "#FF9800",
      "#4CAF50",
      "#2196F3",
      "#F44336",
    ],
    dataLabels: {
      enabled: true,
      formatter: (val) => val,
      offsetY: -20,
      style: { fontSize: "12px", fontWeight: "bold", colors: [textColor] },
    },
    legend: { show: false },
    xaxis: {
      categories: processedData?.months || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: textColor } },
    },
    yaxis: { labels: { show: false } },
    title: {
      text: "Monthly Order Volume",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "900",
        fontFamily: "inherit",
        color: textColor,
      },
    },
    grid: { borderColor: borderColor },
    tooltip: { theme: currentTheme },
  };

  const donutChartOptions = {
    chart: {
      type: "donut",
      foreColor: textColor,
      background: "transparent",
    },
    theme: { mode: currentTheme },
    labels: processedData?.financialLabels || [],
    colors: ["#facc15", "#3b82f6", "#ef4444", "#10b981"],
    stroke: { width: 0 },
    title: {
      text: "Financial Breakdown",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "900",
        fontFamily: "inherit",
        color: textColor,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Gross Sales",
              formatter: () =>
                `$${processedData?.totalSales.toFixed(2)}`,
              style: { fontWeight: "900", color: textColor },
            },
            value: {
              show: true,
              formatter: (val) => `$${parseFloat(val).toFixed(2)}`,
              style: { color: textColor },
            },
            label: {
              show: true,
              style: { color: textColor },
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: { colors: textColor },
    },
    tooltip: {
      theme: currentTheme,
      y: {
        formatter: (val) => `$${val.toFixed(2)}`,
      },
    },
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="p-4">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-heading text-5xl font-black uppercase tracking-tighter text-base-content">
            Control <span className="text-accent text-outline">Center</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
            Live Statistics
          </p>
        </div>
      </header>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        <div className="bg-base-100 border border-base-content/5 p-6 rounded-sm shadow-sm transition-all hover:shadow-xl hover:border-accent/20">
          <ReactApexChart
            options={lineChartOptions}
            series={processedData?.lineSeries || []}
            type="area"
            height={350}
          />
        </div>
        <div className="bg-base-100 border border-base-content/5 p-6 rounded-sm shadow-sm transition-all hover:shadow-xl hover:border-accent/20">
          <ReactApexChart
            options={barChartOptions}
            series={processedData?.barSeries || []}
            type="bar"
            height={350}
          />
        </div>
        <div className="bg-base-100 border border-base-content/5 p-6 rounded-sm shadow-sm transition-all hover:shadow-xl hover:border-accent/20">
          <ReactApexChart
            options={donutChartOptions}
            series={processedData?.financialSeries || []}
            type="donut"
            height={350}
          />
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {[
          {
            label: "Total Sales",
            value: `$${processedData?.totalSales.toFixed(2)}`,
            trend: "Sub Total + Shipping - Discount",
          },
          {
            label: "Pending Orders",
            value: processedData?.pendingOrders,
            trend: "Action Required",
          },
          {
            label: "Orders Completed",
            value: processedData?.completedOrders,
            trend: "Successfully Delivered",
          },
          {
            label: "Total VAT Collection",
            value: `$${processedData?.totalVat.toFixed(2)}`,
            trend: "0.6 % for per product",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 border border-base-content/5 p-8 rounded-sm shadow-sm transition-all hover:shadow-md"
          >
            <p className="text-[9px] font-black uppercase tracking-widest opacity-40 text-base-content">
              {stat.label}
            </p>
            <h3 className="font-heading text-3xl font-black mt-2 text-base-content">
              {stat.value}
            </h3>
            <p
              className={`text-[9px] font-bold mt-1 ${
                stat.label === "Pending Orders"
                  ? "text-orange-500"
                  : stat.trend.includes("+")
                    ? "text-green-500"
                    : "text-blue-500"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
