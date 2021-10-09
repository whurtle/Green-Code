import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { SortRun } from '../src/models/runInstance';
import { Container, Grid, Box, Divider, List, ListItem, ListItemText, Backdrop, CircularProgress, Typography} from '@mui/material';
import { PlotData } from 'plotly.js';
import { Plot } from '../src/components/Plot';
import React from 'react';
import BasicTabs from '../src/components/tabs';
import { calculateCarbonForSeries, calculateCarbonForSort } from '../src/functions/SortRunHelpers';
import theme from '../src/theme';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const requestUrl = 'http://' + context.req.headers.host + '/results/json/' + context.params?.submissionId;
    const data: SortRun[] = await fetch(requestUrl)
        .then(
            res => res.json(),
            err => console.error(err)
        );

    if (!data?.length) {
        return {
            redirect: {
                destination: '/data',
                permanent: true,
            },
        }
    }
    
    return {
        props: { data }
    };
}

export default function Submission(props: { data: SortRun[] }) {    
    const targetLabel = 'CPU Energy';
    const targetMeasure = 'total';

    const targetGraph = props.data.map(algorithmRun => {
        const graphData: Partial<PlotData> = {
            mode: 'lines+markers'
        };
        graphData.name = algorithmRun.sort;
        graphData.x = algorithmRun.runs.map(sizedRun => sizedRun.size).sort((a, b) => a - b);
        graphData.y = graphData.x.map(size => 
            algorithmRun.runs.find(sizedRun => sizedRun.size === size)
                ?.measurements.find(measure => measure.label === targetLabel)
                ?.[targetMeasure] ?? 0
        );
        return graphData;
    });

    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    item
                    direction="column"
                    alignItems="stretch"
                    gap={5}
                >
                    <Box sx={{ boxShadow: 5, p: 2, mt: 5}}>
                        <Grid container>
                            <Grid item>
                                <Plot
                                    data={
                                        targetGraph
                                    }
                                    layout={{  
                                    // xaxis: {
                                    //     linecolor: 'black',
                                    //     linewidth: 2,
                                    //     mirror: true
                                    // },
                                    // yaxis: {
                                    //     linecolor: 'black',
                                    //     linewidth: 2,
                                    //     mirror: true
                                    // },
                                    title: 'CPU Energy'
                                    }}
                                />
                            </Grid>
                            <Divider sx={{ mx: 3 }} orientation="vertical" light={true} flexItem />
                            <Grid item>
                                <Box  sx={{ borderColor: 'secondary.main' }}>
                                    <h4>
                                        Carbon Used:
                                    </h4>
                                    <List>
                                    {
                                        props.data.map((sortRun, i) =>
                                            <ListItem key={i}>
                                                <ListItemText
                                                    primary={`${(calculateCarbonForSort(sortRun) * 1e+3).toFixed(1)} milligrams`}
                                                    secondary={sortRun.sort}
                                                />
                                            </ListItem>,
                                        )
                                    }
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}