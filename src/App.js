import React, {useEffect, useState} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [projects, setProjects] = useState([]);

  // Estrurura: useEffect(() => {}, [])
  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    console.log(id);
    const response = await api.post(`/repositories/${id}/like`);
    const updatedProject = response.data;
    const projectIndex = projects.findIndex(project => id === project.id)
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;

    setProjects(updatedProjects);

    console.log(response);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({item: project}) => (
              <>
                <Text style={styles.repository}>{project.title}</Text>
                 <View style={styles.techsContainer}>
                    <Text style={styles.tech}>
                        {project.techs}
                     </Text>
                     <Text style={styles.tech}>
                        {project.techs}
                     </Text>
                </View>

               <View style={styles.likesContainer}>
                   <Text
                       style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                       testID={`repository-likes-${project.id}`}
                    >
                        {project.likes} curtidas
                   </Text>
               </View>

                   <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.6}
                        onPress={() => handleLikeRepository(project.id)}
                         // Remember to replace "1" below with repository ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        : {`like-button-${repository.id}`}
                         testID={`like-button-${project.id}`}
                            >

                           <Text style={styles.buttonText} >Curtir</Text>
                    </TouchableOpacity>

              </>
            )}
          />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color:'#FFD700',
    marginTop:20
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
    color:'#DCDCDC'
  },
  button: {
    marginTop: 10,
    backgroundColor:'#FFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems:'center',
    width: 68,
    height: 51,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    margin:0,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius:4
  },
});
