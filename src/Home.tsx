import {Button, StyleSheet, Text, View} from "react-native";
import { useQuery } from '@apollo/client';
import INFO_ANT from "./querys/ant-query";
import generateAntWinLikelihoodCalculator from "./utils/generateAntWinLikelihoodCalculator";
import {useEffect, useState} from "react";
import {Ant} from "./entities/ant";
import AntComponent from "./components/Ant";
import ModalComponent from "./components/Modal";



export default function Home() {
    const { loading, error, data } = useQuery(INFO_ANT);
    const [probabilityData, setProbabilityData] = useState([]);
    const [updatedDataEntry, setUpdatedDataEntry] = useState([-1, -1]);
    const [selectedAnt, setSelectedAnt] = useState<Ant>({name:'', color:'', length:0, weight:0});
    const [hasRaceStarted, setHasRaceStarted] = useState(false);
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        const updatedProbabilityData = [...probabilityData];
        // @ts-ignore
        updatedProbabilityData[updatedDataEntry[0]] = updatedDataEntry[1];
        setProbabilityData(updatedProbabilityData);
    }, [updatedDataEntry]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>an error occurred...</Text>;
    }

    function displayAntsData() {
        const nextProbabilityData: string[] | ((prevState: never[]) => never[]) = [];
        data.ants.forEach(() => nextProbabilityData.push('Not yet run'));
        // @ts-ignore
        setProbabilityData(nextProbabilityData);
    }


    function fetchAntWinLikelihood(index:any) {
        return new Promise(generateAntWinLikelihoodCalculator()).then((resolved) => {
            setUpdatedDataEntry([index, resolved]);
        });
    }

    function startRace() {
        const nextProbabilityData = probabilityData.slice();
        for(let i = 0; i < data.ants.length; i++) {
            fetchAntWinLikelihood(i);
            // @ts-ignore
            nextProbabilityData[i] = 'In progress';
        }
        setProbabilityData(nextProbabilityData);
        setHasRaceStarted(true);
    }

    function selectAnt(ant:Ant) {
        setSelectedAnt(ant);
        setModalShow(true);
    }

    return (
        <View style={styles.container}>
            <View>
                <Button title='Fetch Ants' onPress={() => displayAntsData()} />
                <Button title='Start a Race' onPress={() => startRace()} />
            </View>
            <View>
                <AntComponent
                    antsData={data.ants}
                    probabilityData={probabilityData}
                    hasRaceStarted={hasRaceStarted}
                    selectAnt={selectAnt}
                />
                <ModalComponent
                    modalShow={modalShow}
                    ant={selectedAnt}
                    onHide={() => setModalShow(false)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 70,
    },
});