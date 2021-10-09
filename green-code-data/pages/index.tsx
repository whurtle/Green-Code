import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { SortRun } from '../src/models/runInstance';
import { Container, Grid, Box, List, ListItem, ListItemText, Divider, Backdrop, CircularProgress} from '@mui/material';
import { PlotData } from 'plotly.js';
import { Plot } from '../src/components/Plot';
import React from 'react';
import BasicTabs from '../src/components/tabs';
import { calculateCarbonForSeries, calculateCarbonForSort } from '../src/functions/SortRunHelpers';
import theme from '../src/theme';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const requestUrl = 'http://' + context.req.headers.host + '/results/json';
    const data: SortRun[] = await fetch(requestUrl)
        .then(
            res => res.json(),
            err => console.error(err)
        );

    // get top 5 of each so:rt
    const sorts: object = data.reduce((map, next) => {
        // @ts-ignore
        (map[next.sort] = map[next.sort] || []).push(next);
        return map;
      }, {} as object);
    
    Object.keys(sorts).forEach((sort: string) => {
        // @ts-ignore
        sorts[sort] = sorts[sort]
            .sort((a: SortRun, b: SortRun) => calculateCarbonForSort(a) - calculateCarbonForSort(b))
            .slice(0, 5);
    })
    
    return {
        props: { sorts }
    };
}

export default function Home(props: { sorts: { [key: string]: SortRun[] } }) {    
    const targetLabel = 'CPU Energy';

    const targetGraph = (sortRuns: SortRun[]) => sortRuns.map(algorithmRun => {
        const graphData: Partial<PlotData> = {
            mode: 'lines+markers'
        };
        graphData.name = algorithmRun.id;
        graphData.x = algorithmRun.runs.map(sizedRun => sizedRun.size).sort((a, b) => a - b);
        graphData.y = graphData.x.map(size => 
            algorithmRun.runs.find(sizedRun => sizedRun.size === size)
                ?.measurements.find(measure => measure.label === targetLabel)
                ?.value ?? 0
        );
        return graphData;
    });

    console.log(props)
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
                >
                    <Box sx={{ boxShadow: 5, p: 2, mt: 3 }}>
                        <BasicTabs 
                          tabNames={
                            Array.from( Object.keys(props.sorts) )
                          } 
                          tabContents={
                            Array.from( Object.values(props.sorts) )
                                .map((sortRuns, i) =>
                                    <Grid container key={sortRuns[0].sort + i}>
                                        <Grid item>
                                            <Plot
                                                data={
                                                    targetGraph(sortRuns)
                                                }
                                                layout={{  
                                                xaxis: {
                                                    title: 'Size of Array'
                                                },
                                                yaxis: {
                                                    title: 'Milliwatt Hours'
                                                },
                                                title: 'CPU Energy - ' + sortRuns[0].sort.toLocaleUpperCase()
                                                }}
                                            />
                                        </Grid>
                                        <Divider sx={{ mx: 3 }} orientation="vertical" light={true} flexItem />
                                        <Grid item>
                                            <Box  sx={{ borderColor: 'secondary.main' }}>
                                                <h4>
                                                    Least Carbon Used:
                                                </h4>
                                                <List>
                                                {
                                                    sortRuns.map((sortRun, i) =>
                                                        <ListItem key={i}>
                                                            <ListItemText
                                                                primary={`${i + 1}. ${(calculateCarbonForSort(sortRun) * 1e+3).toFixed(1)} milligrams`}
                                                                secondary={sortRun.id}
                                                            />
                                                        </ListItem>,
                                                    )
                                                }
                                                </List>
                                            </Box>
                                        </Grid>
                                  </Grid>
                                )
                          } 
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
