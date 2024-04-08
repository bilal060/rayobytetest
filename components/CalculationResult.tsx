import React from 'react'

export interface CalculationProps {
    currentProxyCost?: number;
    newProxyCost?: number;
    totalCost?: number;
    costPerScrape?: number;
    costIncrease?: number;
    newCostPerScraping?: number;
    newComputeCostPerScraping?: number;
    computeCostIncrease?: number;
    computingResourceCostMonth?: number;
    isErrorOccur?: boolean
}

const CalculationResult = ({
    currentProxyCost,
    newProxyCost,
    totalCost,
    costPerScrape,
    costIncrease,
    newCostPerScraping,
    newComputeCostPerScraping,
    computeCostIncrease,
    computingResourceCostMonth,
    isErrorOccur
}: CalculationProps) => {
    return (
        <div className='calculator-main'>
            <div className='calculation-result'>
                <h2 className='heading'>Your Total Cost</h2>
                <div className='results-row1'>
                    <div>
                        <p className='label'>Total costs in a given month</p>
                        <div className='detail'><p>${totalCost ? totalCost : totalCost?.toFixed(2)}</p></div>
                    </div>
                    <div>
                        <p className='label'>Cost-per scrape </p>
                        <div className='detail'><p>${costPerScrape ? costPerScrape : costPerScrape?.toFixed(2)}</p></div>
                    </div>
                </div>
            </div>

            <div className='calculation-row2'>
                <div className={`calculation-result ${isErrorOccur ? 'error-main' : ''}`}>
                    <h2 className='heading'>Proxy Cost Increase</h2>
                    {isErrorOccur && <p className='errorClass'>Fill the new proxy price per unit section in order to calculate the Proxy cost increase</p>}
                    <div className='results-row2'>
                        <div>
                            <p className='label'>Current proxy costs</p>
                            <div className='detail'><p>${currentProxyCost ? currentProxyCost : currentProxyCost?.toFixed(2)}</p></div>
                        </div>
                        <div>
                            <p className='label'>New proxy costs: </p>
                            <div className='detail'><p>${newProxyCost ? newProxyCost : newProxyCost?.toFixed(2)}</p></div>
                        </div>
                    </div>
                    <div className='results-row2'>
                        <div>
                            <p className='label'>Cost increase</p>
                            <div className='detail'><p>${costIncrease ? costIncrease : costIncrease?.toFixed(2)}</p></div>
                        </div>
                        <div>
                            <p className='label'>New cost per scraping</p>
                            <div className='detail'><p>${newCostPerScraping ? newCostPerScraping : newCostPerScraping?.toFixed(2)}</p></div>
                        </div>
                    </div>
                </div>
                <div className='calculation-result'>
                    <h2 className='heading'>Compute Cost Increase</h2>
                    <div className='results-row2'>
                        <div>
                            <p className='label'>Current compute cost/month</p>
                            <div className='detail'><p>${computingResourceCostMonth ? computingResourceCostMonth : computingResourceCostMonth?.toFixed(2)}</p></div>
                        </div>
                        <div>
                            <p className='label'>New compute cost/month with browser-based: </p>
                            <div className='detail'><p>${computingResourceCostMonth ? (computingResourceCostMonth * 100) : computingResourceCostMonth?.toFixed(2)}</p></div>
                        </div>
                    </div>
                    <div className='results-row2'>
                        <div>
                            <p className='label'>Cost increase</p>
                            <div className='detail'><p>${computeCostIncrease ? computeCostIncrease : computeCostIncrease?.toFixed(2)}</p></div>
                        </div>
                        <div>
                            <p className='label'>New cost per Scraping</p>
                            <div className='detail'><p>${newComputeCostPerScraping ? newComputeCostPerScraping : newComputeCostPerScraping?.toFixed(2)}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CalculationResult