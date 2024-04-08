import CalculationResult from '@/components/CalculationResult';
import CustomInput from '@/components/Input';
import React, { useEffect, useState } from 'react';
import CalculatorNewComponent from './CalculatorNew';

export interface CalculatorProps {
  children?: React.ReactNode;
  className?: string;
  verbose?: boolean;
}

const CalculatorComponent = ({
  className,
}: CalculatorProps) => {
  const [gbPerScrape, setGbPerScrape] = useState(0)
  const [developmentCost, setdevelopmentCost] = useState(0)
  const [scrapesConducted, setScrapesConducted] = useState(0)
  const [perUnitPrice, setperUnitPrice] = useState(0)
  const [unitPurchased, setUnitPurchased] = useState(0)
  const [gigaByte, setgigaByte] = useState(0)
  const [computingResourceCost, setComputingResourceCost] = useState(0)
  const [totalCost, setTotalCost] = useState(0);
  const [costPerScrape, setCostPerScrape] = useState(0);
  const [currentProxyCost, setCurrentProxyCost] = useState(0);
  const [newProxyCost, setNewProxyCost] = useState(0);
  const [costIncrease, setCostIncrease] = useState(0);
  const [newCostPerScraping, setNewCostPerScraping] = useState(0);
  const [computeCostIncrease, setComputeCostIncrease] = useState(0);
  const [newComputeCostPerScraping, setNewComputeCostPerScraping] = useState(0);
  const [computingResourceCostMonth, setComputingResourceCostMonth] = useState(0);
  const [isErrorOccur, setisErrorOccur] = useState(false);

  const [costType, setCostType] = useState("")

  const submitHandler = (e: any) => {
    e.preventDefault();
    costType !== "" && gigaByte !== 0 && !isNaN(gigaByte) ? setisErrorOccur(false) : setisErrorOccur(true)
    console.log(costType, gigaByte)
    setComputingResourceCostMonth(computingResourceCost)
    calculateTotalCosts();
    calculateCostPerScrape();
    calculateProxyCosts();
    calculateCostIncrease();
    calculateNewCostPerScraping();
    calculateComputeCostIncrease();
    calculateComputeNewCostPerScraping();
  }

  // Total costs in a given month
  const calculateTotalCosts = () => {
    const totalProxyCost = perUnitPrice * unitPurchased;
    const totalCosts = computingResourceCost + totalProxyCost + developmentCost;
    setTotalCost(totalCosts)
  };

  // Cost-per scrape
  const calculateCostPerScrape = () => {
    const totalProxyCost = perUnitPrice * unitPurchased;
    const costPerScrape = (computingResourceCost + totalProxyCost + developmentCost) / scrapesConducted;
    setCostPerScrape(costPerScrape)
  };

  // Current proxy costs + New proxy costs
  const calculateProxyCosts = () => {
    let gigaByteValue = isNaN(gigaByte) ? 0 : gigaByte;

    const totalProxyCost = (perUnitPrice) * unitPurchased;
    setCurrentProxyCost(totalProxyCost);
    if (costType !== "" && gigaByte && gigaByte > 0) {
      if (costType === "ResidentialProxy") {
        const newProxyCost = gigaByteValue * gbPerScrape;
        setNewProxyCost(newProxyCost)
      }
      else {
        const newProxyCost = gigaByteValue * unitPurchased;
        setNewProxyCost(newProxyCost)
      }
    } else {
      setNewProxyCost(0)
    }
  };

  // Cost increase
  const calculateCostIncrease = () => {
    const currentProxyCost = (perUnitPrice) * unitPurchased;
    let gigaByteValue = isNaN(gigaByte) ? 0 : gigaByte;
    if (costType !== "" && gigaByte && gigaByte > 0) {
      if (costType === "ResidentialProxy") {
        const newProxyCost = gigaByteValue * gbPerScrape;
        const costIncrease = newProxyCost - currentProxyCost;
        setCostIncrease(costIncrease);
      }
      else {
        const newProxyCost = gigaByteValue * unitPurchased;
        const costIncrease = newProxyCost - currentProxyCost;
        setCostIncrease(costIncrease);
      }
    } else {
      setCostIncrease(0);

    }
  };

  // New cost per scraping
  const calculateNewCostPerScraping = () => {
    const currentProxyCost = (perUnitPrice) * unitPurchased;
    const totalCosts = computingResourceCost + currentProxyCost + developmentCost;
    let gigaByteValue = isNaN(gigaByte) ? 0 : gigaByte;
    if (costType !== "" && gigaByte && gigaByte > 0) {
      if (costType === "ResidentialProxy") {
        const newProxyCost = gigaByteValue * gbPerScrape;
        const costIncrease = newProxyCost - currentProxyCost;
        const newCostPerScraping = (totalCosts + costIncrease) / scrapesConducted;
        setNewCostPerScraping(newCostPerScraping)
      }
      else {
        const newProxyCost = gigaByteValue * unitPurchased;
        const costIncrease = newProxyCost - currentProxyCost;
        const newCostPerScraping = (totalCosts + costIncrease) / scrapesConducted;
        setNewCostPerScraping(newCostPerScraping)
      }
    } else {
      setNewCostPerScraping(0)

    }
  };

  // compute cost increase
  const calculateComputeCostIncrease = () => {
    const newComputingCost = computingResourceCost * 100;
    const computeCostIncrease = newComputingCost - computingResourceCost;
    setComputeCostIncrease(computeCostIncrease);
  };

  // compute new cost per scraping
  const calculateComputeNewCostPerScraping = () => {
    const totalProxyCost = perUnitPrice * unitPurchased;
    const totalCosts = computingResourceCost + totalProxyCost + developmentCost;
    const newComputingCost = computingResourceCost * 100;
    const computeCostIncrease = newComputingCost - computingResourceCost;
    const newComputeCostPerScraping = (totalCosts + computeCostIncrease) / scrapesConducted;
    setNewComputeCostPerScraping(newComputeCostPerScraping)
  };


  return (
    <div className={`${className}`}>
      <form className="calculator-form" onSubmit={(e) => submitHandler(e)}>
        <div className="calculate-row">
          <div className="calculator-inputbox">
            <label>How much GB do you use per scrape?</label><br />
            <CustomInput
              onChange={setGbPerScrape}
              value={gbPerScrape}
              placeholder="Gigabytes per scrape (in GB)"
              type="number"
            />
          </div>

          <div className="calculator-inputbox">
            <label>Monthly development total cost</label><br />
            <CustomInput
              onChange={setdevelopmentCost}
              value={developmentCost}
              placeholder="Total cost (in $)"
              type="number"
            />
          </div>

          <div className="calculator-inputbox">
            <label>Total number of scrapes conducted in a given month</label><br />
            <CustomInput
              onChange={setScrapesConducted}
              value={scrapesConducted}
              placeholder="Total number of scrapes"
              type="number"
            />
          </div>
          <div className="calculator-inputbox">
            <label>Computing resource cost in a given month</label><br />
            <CustomInput
              onChange={setComputingResourceCost}
              value={computingResourceCost}
              placeholder="Computing resource cost (in $)"
              type="number" />
          </div>
          {/* <div className="calculator-inputbox">
            <label>Price per Gigabytes for residential proxy </label><br />
            <CustomInput
              onChange={setgigaByte}
              value={gigaByte}
              placeholder="Price per GB (in $)"
              type="number" />
          </div> */}
          <div className='two-fields select1'>
            <div className="calculator-inputbox selectmain">
              <label>New proxy price per unit </label><br />
              <div className='subdivforselect'>
                <select name="" id="" value={costType} onChange={(e) => setCostType(e.target.value)}>
                  <option value="">Select proxy type</option>
                  <option value="ResidentialProxy">Residential Proxy</option>
                  <option value="ISPProxy">ISP Proxy</option>
                  <option value="DataCenterProxy">Data Center Proxy</option>
                  {/* <option value="mobile">Mobile</option> */}
                </select>
                <CustomInput
                  onChange={setgigaByte}
                  value={gigaByte}
                  placeholder="Proxy price per unit"
                  required={false}
                  type="number" />

              </div>
            </div>
          </div>

          <div className='two-fields'>
            <div className="calculator-inputbox">
              <label>Price per unit</label><br />
              <CustomInput
                onChange={setperUnitPrice}
                value={perUnitPrice}
                placeholder="Price per unit (in $)"
                type="number" />
            </div>
            <div className="calculator-inputbox">
              <label>Units purchased</label><br />
              <CustomInput
                onChange={setUnitPurchased}
                value={unitPurchased}
                placeholder="Units purchased"
                type="number" />
            </div>
          </div>
        </div>
        <div>
          <button className="btn-primary-outline-hover" type='submit'>Calculate</button>
        </div>
      </form>

      <CalculationResult
        totalCost={totalCost}
        costPerScrape={costPerScrape}
        currentProxyCost={currentProxyCost}
        newProxyCost={newProxyCost}
        costIncrease={costIncrease}
        newCostPerScraping={newCostPerScraping}
        computeCostIncrease={computeCostIncrease}
        newComputeCostPerScraping={newComputeCostPerScraping}
        computingResourceCostMonth={computingResourceCostMonth}
        isErrorOccur={isErrorOccur}
      />
    </div>
  );
};

export default CalculatorComponent;


