import React from "react";

const TableSkeleton = () => {
  return (
    <div>
      <tbody className="divide-y divide-black/5 animate-pulse">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="transition-colors">
            {/* Index Column */}
            <td className="px-8 py-6">
              <div className="h-4 w-4 bg-base-300 rounded"></div>
            </td>

            {/* Category Name Column */}
            <td className="px-8 py-6">
              <div className="h-4 w-32 bg-base-300 rounded"></div>
            </td>

            {/* ID Column (Center Aligned) */}
            <td className="px-8 py-6">
              <div className="h-3 w-12 bg-base-200 mx-auto rounded"></div>
            </td>

            {/* Status Badge Column */}
            <td className="px-8 py-6">
              <div className="h-5 w-14 bg-base-200 border border-base-300 inline-block rounded-sm"></div>
            </td>

            {/* Actions Column (Right Aligned) */}
            <td className="px-8 py-6">
              <div className="flex justify-end gap-4">
                <div className="h-5 w-5 bg-base-300 rounded-full"></div>
                <div className="h-5 w-5 bg-base-300 rounded-full"></div>
                <div className="h-5 w-5 bg-base-300 rounded-full"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default TableSkeleton;
