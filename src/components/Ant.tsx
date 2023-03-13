import {Text, View, StyleSheet, Button, ScrollView} from "react-native";
import {Ant} from "../entities/ant";
// @ts-ignore
import { DataTable } from 'react-native-paper';
import React from 'react';

export default class AntComponent extends React.Component<{
    antsData: Ant[],
    probabilityData: any,
    hasRaceStarted: boolean,
    selectAnt: any
}> {
    render() {
        let {
            antsData,
            probabilityData,
            hasRaceStarted,
            selectAnt
        } = this.props;
        function linkData(){
            const linkedData = [];
            for(let i = 0; i < antsData.length; i++) {
                linkedData.push({ ant: antsData[i], probabilityOfWinning: probabilityData[i]});
            }
            return linkedData;
        }
        function prettyPrintProbabilityData(){
            let isRaceInProgress = false;
            const sortedData = linkData().sort((a, b) => {
                if(a.probabilityOfWinning === 'In progress') {
                    isRaceInProgress = true;
                    return 1;
                }
                return b.probabilityOfWinning - a.probabilityOfWinning;
            });
            const generalStatusLabel = 'Status: ';
            let generalStatusText;
            if(!hasRaceStarted) {
                generalStatusText = 'Not yet run';
            } else if(isRaceInProgress) {
                generalStatusText = 'In progress';
            } else {
                generalStatusText = 'All calculated';
            }
            const displayElements = [];
            for(let i = 0; i < sortedData.length; i++) {
                const key = `probability_${i}`;
                let probabilityToDisplay = sortedData[i].probabilityOfWinning;

                if (typeof probabilityToDisplay === 'number') {
                    probabilityToDisplay = `${(probabilityToDisplay * 100).toFixed(2)}%`;
                } else if (!hasRaceStarted) {
                    probabilityToDisplay = 'Not yet run';
                }

                if (i === sortedData.length - 1) {
                    displayElements.push(
                        <DataTable.Row key={key}>
                            <DataTable.Cell>{sortedData[i].ant.name}</DataTable.Cell>
                            <DataTable.Cell>{probabilityToDisplay}</DataTable.Cell>
                            <DataTable.Cell><Button title='>' onPress={() => selectAnt(sortedData[i].ant)} /></DataTable.Cell>
                        </DataTable.Row>
                    );
                } else {
                    displayElements.push(
                        <DataTable.Row key={key}>
                            <DataTable.Cell>{sortedData[i].ant.name}</DataTable.Cell>
                            <DataTable.Cell>{probabilityToDisplay}</DataTable.Cell>
                            <DataTable.Cell><Button title='>' onPress={() => selectAnt(sortedData[i].ant)} /></DataTable.Cell>
                        </DataTable.Row>
                    );
                }
            }
            return (
                <View>
                    <Text>ANT RACE</Text>
                    <Text>{generalStatusLabel + generalStatusText}</Text>
                    <DataTable>
                        <DataTable.Header key='status'>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Likelihood</DataTable.Title>
                            <DataTable.Title>#</DataTable.Title>
                        </DataTable.Header>
                        {displayElements}
                    </DataTable>
                </View>
            )
        }
        return (
            <ScrollView  style={styles.container}>
                {prettyPrintProbabilityData()}
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
    },
});