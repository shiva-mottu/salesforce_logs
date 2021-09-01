import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import SequenceSunBurst from './SequenceSunburst';
import RadialTree from './RadialTree';
//import ZoomableChart from "./ZoomableChart"
import FlameGraph from "../pages/FlameGraph"
import TreeGraph from "./Tree"

function Home() {
    return (
        <Tabs>
            <TabList>
                {/* <Tab>SequenceSunBurst</Tab> */}
                <Tab>RadialTree</Tab>
                <Tab>ZoomableChart</Tab>
                <Tab>FlameGraph</Tab>
                <Tab>Tree Graph</Tab>
            </TabList>

            {/* <TabPanel>
                <SequenceSunBurst />
            </TabPanel> */}
            <TabPanel>
                <RadialTree />
            </TabPanel>

            <TabPanel>
                {/* <ZoomableChart /> */}
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

export default Home;