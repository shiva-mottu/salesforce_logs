import React from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SequenceSunBurst from './SequenceSunburst';
import RadialTree from './RadialTree';
import ZoomableChart from "./ZoomableChart"
import FlameGraph from "./FlameGraph"
import TreeGraph from "./Tree"

function AnalyseCharts() {
    return (
        <Tabs>
            <TabList>
                <Tab>SequenceSunBurst</Tab>
                <Tab>ZoomableChart</Tab>
                <Tab>RadialTree</Tab>
                <Tab>FlameGraph</Tab>
                <Tab>Tree Graph</Tab>
            </TabList>

            <TabPanel>
                <SequenceSunBurst />
            </TabPanel>
            <TabPanel>
                <ZoomableChart />
            </TabPanel>

            <TabPanel>
                <RadialTree />
            </TabPanel>

            <TabPanel>
                <FlameGraph />
            </TabPanel>

            <TabPanel>
                <TreeGraph />
            </TabPanel>
        </Tabs>
    );
}

export default AnalyseCharts;