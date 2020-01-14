import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { fetchWorkouts, setDisplayedWorkout } from '../actions/workoutActions'
import { connect } from 'react-redux'


class WorkoutHistory extends React.Component{
    
    componentDidMount(){
        this.props.fetchWorkouts()
    }

    goToDetails = (navigation, id) => {
        this.props.setDisplayedWorkout(id)
        navigation.navigate('Workout Details')
    }

    convertDate = (date) => {
        dateItems = date.split('T')
        return dateItems[0]
    }

    render(){
        const {loading, workoutHistory, navigation} = this.props
        if(loading){
            return <Text style={styles.headerText}>Loading...</Text>
        }
        return (
            <View style={styles.container}>
                <FlatList 
                    data={workoutHistory}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.item} activeOpacity={1} onPress={() => this.goToDetails(navigation, item.id)}>
                            <View style={styles.topRow}>
                                <Text style={styles.cardText}>{this.convertDate(item.workout_date)}</Text>
                                <Text style={styles.cardText}>Workout Type: {item.routine_type}</Text>
                            </View>
                            <View style={styles.bottomRow}>
                                {item.exercises.map((exercise, index) => {
                                    return(
                                        <View style={styles.exerciseRow} key={exercise + index}>
                                            <Text style={styles.setRepText}>{exercise.name}</Text>
                                            <View style={styles.setRepData}>
                                                <Text style={styles.setRepText}>{exercise.tier}: </Text>
                                                <Text style={styles.setRepText}>{exercise.numSets} x {exercise.reps} - {exercise.weight}lb</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString() + "WH"}
                />
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        workoutHistory: state.workoutHistory,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    fetchWorkouts,
    setDisplayedWorkout
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutHistory)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        marginHorizontal: 10
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'        
    },
    bottomRow: {
        flexDirection: 'column',
        // alignItems: 'center',
        marginTop: 14,
        // marginBottom:6,
        // flexWrap: 'wrap',
    },
    exerciseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16,
        marginBottom: 5
    },
    setRepData: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        // alignSelf:'flex-end'
    },
    item: {
        marginTop: 10,
        padding: 10, 
        borderRadius: 3,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    cardText: {
        fontSize: 18
    },
    setRepText: {
        fontSize: 16
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        paddingTop: 10
    },
  });
