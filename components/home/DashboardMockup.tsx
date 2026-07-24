import React from "react";
import { TrendingUp, Users, ShoppingCart, Wallet } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiFlutter,
} from "react-icons/si";

const STATS = [
  { icon: Wallet, label: "Revenue", value: "$29,430", color: "text-blue-600 bg-blue-50" },
  { icon: Users, label: "Clients", value: "1,204", color: "text-emerald-600 bg-emerald-50" },
  { icon: ShoppingCart, label: "Orders", value: "382", color: "text-amber-600 bg-amber-50" },
];

const PHONE_STATS = [
  { label: "Revenue", value: "$29,430" },
  { label: "Clients", value: "1,204" },
];

const FLOATING_ICONS = [
  { Icon: SiReact, className: "-left-2 top-10 size-14", iconClass: "size-7 text-cyan-500" },
  { Icon: SiNextdotjs, className: "left-1/2 -top-8 size-14 -translate-x-1/2", iconClass: "size-7 text-slate-900" },
  { Icon: SiNodedotjs, className: "-left-8 top-1/2 size-13", iconClass: "size-6 text-emerald-600" },
  { Icon: SiTypescript, className: "-left-4 bottom-6 size-12", iconClass: "size-6 text-blue-600" },
  { Icon: SiMongodb, className: "bottom-0 left-1/2 size-13", iconClass: "size-6 text-emerald-500" },
  { Icon: SiFlutter, className: "-bottom-4 right-1/4 size-11", iconClass: "size-5 text-sky-500" },
];

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-10 sm:py-10">
        {FLOATING_ICONS.map(({ Icon, className, iconClass }, i) => (
          <span
            key={i}
            className={`absolute z-20 hidden items-center justify-center rounded-full bg-white shadow-lg shadow-slate-200/80 ring-1 ring-slate-100 sm:flex ${className}`}
          >
            <Icon className={iconClass} />
          </span>
        ))}

      <div className="relative flex w-full items-end justify-center">
        <div className="relative w-full rounded-t-2xl border-8 border-slate-800 bg-slate-800 shadow-2xl">
          <div className="overflow-hidden rounded-t-lg bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="text-sm font-bold text-slate-800">ScriptHubLab</span>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-red-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4">
              {STATS.map((s) => (
                <div key={s.label} className={`rounded-lg p-3 ${s.color}`}>
                  <s.icon className="size-4" />
                  <p className="mt-2 text-sm font-bold">{s.value}</p>
                  <p className="text-[10px] font-medium opacity-80">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mx-4 mb-4 flex h-24 items-end gap-1.5 rounded-lg bg-slate-50 p-3">
              {[40, 65, 45, 80, 55, 90, 60, 75, 50, 85].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-linear-to-t from-blue-600 to-blue-400"
                />
              ))}
            </div>

            <div className="mx-4 mb-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
              <TrendingUp className="size-4" /> +18.4% growth this month
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-4 w-20 shrink-0 rounded-[1.4rem] border-4 border-slate-800 bg-slate-800 shadow-2xl sm:w-24">
          <div className="overflow-hidden rounded-[1.1rem] bg-white">
            <div className="flex justify-center py-1.5">
              <span className="h-1 w-6 rounded-full bg-slate-200" />
            </div>
            <div className="space-y-1.5 px-2 pb-3">
              {PHONE_STATS.map((s) => (
                <div key={s.label} className="rounded-md bg-slate-50 p-1.5">
                  <p className="text-[9px] font-bold text-slate-800">{s.value}</p>
                  <p className="text-[7px] font-medium text-slate-400">{s.label}</p>
                </div>
              ))}
              <div className="flex h-10 items-end gap-1 rounded-md bg-slate-50 p-1.5">
                {[40, 70, 50, 85, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t bg-linear-to-t from-blue-600 to-blue-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
