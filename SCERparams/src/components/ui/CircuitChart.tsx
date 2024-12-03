"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend, ChartLegendContent
} from "@/components/ui/chart";

// Prepared data
const clockLow = -2;
const clockHigh = 2;
const clockStep = 3;

const linspace = (start, end, n) =>
  Array.from({ length: n }, (_, i) => start + (i * (end - start)) / (n - 1));

const pSwitch = linspace(clockLow, clockHigh, clockStep);
const pHold = Array(clockStep).fill(clockHigh);
const pRelease = linspace(clockHigh, clockLow, clockStep);
const pReset = Array(clockStep).fill(clockLow);

const pCycle = [...pSwitch, ...pHold, ...pRelease, ...pReset];

const stackPhase = [
  [...pCycle, ...pCycle, ...pReset, ...pReset],
  [...pReset, ...pCycle, ...pCycle, ...pReset],
  [...pReset, ...pReset, ...pCycle, ...pCycle],
];

const chartData = stackPhase[0].map((_, idx) => ({
  index: idx + 1,
  phase1: stackPhase[0][idx],
  phase2: stackPhase[1][idx],
  phase3: stackPhase[2][idx],
}));

const chartConfig = {
  phase1: {
    label: "Phase 1",
    color: "hsl(var(--chart-1))",
  },
  phase2: {
    label: "Phase 2",
    color: "hsl(var(--chart-2))",
  },
  phase3: {
    label: "Phase 3",
    color: "hsl(var(--chart-3))",
    
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stack Phases</CardTitle>
        <CardDescription>Visualization of stack phase data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-chart w-[400px]'>
          <LineChart
            width={500}  // Add this
            height={300} // Add this
            accessibilityLayer
            data={chartData}
            margin={{
              top: 2,
              left: 20,
              right: 2,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "Unit of Time", position: "bottom", offset: 0 }}
            />
            <YAxis 
             label={{ value: "Electric Field [V/m]", position: "left", offset: -20, angle: -90, dy: -70 }}
             tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={1}
              // content={<ChartTooltipContent 
              content={<ChartTooltipContent formatter={(value, name, label) => `${chartConfig[name as keyof typeof chartConfig]?.label ||
                name}: ${value.toLocaleString()}`} 
                hideLabel
                className="text-[hsl(var(--chart-foreground))]" />}
             
            />
            <ChartLegend content={<ChartLegendContent/>} />
            <Line
              dataKey="phase1"
              type="linear"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--chart-1)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="phase2"
              type="linear"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-2))",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="phase3"
              type="linear"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-3))",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Circuit data processed successfully{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing processed stack phase data.
        </div> */}
      </CardFooter>
    </Card>
  );
}
