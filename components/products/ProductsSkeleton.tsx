"use client";

import React from "react";

export default function ProductsSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Top Info line skeleton */}
      <div className="h-4 bg-slate-200 rounded-md w-48" />

      {/* 3 Columns x 3 Rows = 9 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs space-y-4 p-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-full h-52 bg-slate-200 rounded-xl" />
              <div className="space-y-2 text-center">
                <div className="h-5 bg-slate-200 rounded-md w-3/4 mx-auto" />
                <div className="h-3.5 bg-slate-200 rounded-md w-5/6 mx-auto" />
                <div className="h-3.5 bg-slate-200 rounded-md w-2/3 mx-auto" />
              </div>
            </div>
            <div className="pt-2">
              <div className="h-9 bg-slate-200 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Bar Skeleton */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-200">
        <div className="h-4 bg-slate-200 rounded-md w-32" />
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-slate-200 rounded-xl" />
          <div className="h-9 w-9 bg-slate-200 rounded-xl" />
          <div className="h-9 w-9 bg-slate-200 rounded-xl" />
          <div className="h-9 w-20 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
