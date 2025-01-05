"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpIcon, DollarSignIcon, PercentIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "./ui/switch";

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [contribution, setContribution] = useState(100);
  const [contributionType, setContributionType] = useState<"monthly" | "anual">(
    "monthly"
  );
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(6);

  const calculateInvestment = () => {
    let capital = initialInvestment;
    let totalInvested = initialInvestment;

    for (let i = 0; i < years; i++) {
      const realContribution =
        contribution * (contributionType === "monthly" ? 12 : 1);
      capital += realContribution;
      totalInvested += realContribution;
      capital += capital * (interestRate / 100);
    }

    const totalProfit = capital - totalInvested;
    const profitPercentage = (totalProfit / totalInvested) * 100;

    return {
      totalInvested: Number(totalInvested.toFixed(2)),
      finalCapital: Number(capital.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      profitPercentage: Number(profitPercentage.toFixed(2)),
    };
  };

  const results = calculateInvestment();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  console.log({ results });

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Calculadora de inversión
          </CardTitle>
          <CardDescription className="text-center">
            Calcula cuánto dinero tendrás en el futuro si inviertes hoy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">Inversión inicial ($)</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  min="0"
                  className="text-lg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="contributionType">Contribución Mensual</Label>
                <Switch
                  id="contributionType"
                  checked={contributionType === "anual"}
                  onCheckedChange={() => {
                    setContributionType(
                      contributionType === "monthly" ? "anual" : "monthly"
                    );
                  }}
                />
                <Label htmlFor="contributionType">Contribución Anual</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearlyContribution">
                  Contribución{" "}
                  {contributionType === "monthly" ? "mensual" : "anual"} ($)
                </Label>
                <Input
                  id="yearlyContribution"
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(Number(e.target.value))}
                  min="0"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years">Período de inversión (años)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min="1"
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Tasa de interés anual (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="0"
                  className="text-lg"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-400 p-6 rounded-lg shadow-inner space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">
                Resultados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Invertido
                    </p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 break-words">
                      {formatCurrency(results.totalInvested)}
                    </p>
                  </div>
                  <ArrowUpIcon className="w-5 h-5 text-blue-500 mt-2" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Capital Final
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400 break-words">
                      {formatCurrency(results.finalCapital)}
                    </p>
                  </div>
                  <ArrowUpIcon className="w-5 h-5 text-green-500 mt-2" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Profit ($)
                    </p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400 break-words">
                      {formatCurrency(results.totalProfit)}
                    </p>
                  </div>
                  <DollarSignIcon className="w-5 h-5 text-purple-500 mt-2" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Profit (%)
                    </p>
                    <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                      {isNaN(results.profitPercentage)
                        ? "-"
                        : `${results.profitPercentage.toFixed(2)}%`}
                    </p>
                  </div>
                  <PercentIcon className="w-5 h-5 text-orange-500 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
