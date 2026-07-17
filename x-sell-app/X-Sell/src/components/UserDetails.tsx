import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {  useEffect, useState } from "react";

import { useMessageDialog, MsgType } from "@/hooks/useMessageDialog";

import { seeUsers , setAdmin, UserDetails }from "@/services/adminTasks";
import { styles } from "@/styles/styles";

type UserDetailProps = {
  visible: boolean;
  onClose: () => void;
};

function Separator() {
  return <View style={styles.detailsSeparator} />;
}

export function UserDetailsBox({
  visible,
  onClose
}: UserDetailProps) {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [isLoading, SetIsLoading] = useState(false); 
    const {showMessage, MessageDialog} = useMessageDialog();
  
    async function handleSeeUsers() {
        SetIsLoading(true);   
          const response = await seeUsers();
                if (response.success && response.data) {
                    setUsers(response.data);
                    SetIsLoading(false);
                }
        SetIsLoading(false);
    }

    useEffect( () => {if (visible) {handleSeeUsers();}}, [visible==false]);
    
    async function handleSetAdmin(id: Number, setTo: boolean) {
      const response = await setAdmin(id , setTo);
                  showMessage({message : response.message,
                  msgType: response.msgType as MsgType});
                  handleSeeUsers();
    }

  return (
    <>
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <View style={styles.boxContent}>
            {isLoading && 
            <Text style={{alignContent:"center", ...styles.buttonText}}> Carregando... </Text>}
            {!isLoading && users &&   
              <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={ ({item}) => (
                  <View style={styles.userDetails}>
                    <View style={styles.left}>
                      <View style={styles.titleRow}>
                        <MaterialIcons
                        name={  (item.id == 1) ? "key" : item.admin ? "verified-user" : "person"}
                        size={18}
                        color={item.admin? "#16be2c": "#3894d1" }
                      />
                        <Text style={styles.id}>{item.id}</Text>
                        <Text style={styles.aboutBadgeText}>{item.nomeContato}</Text>
                      </View>
                    </View>
          
                    <View style={styles.right}>
                      <View style={{...styles.buttonRow, justifyContent:"flex-end"}}>
                      {( item.id != 1) &&
                        <Pressable    
                            style={styles.smallButton}
                            onPress={() => handleSetAdmin(item.id, !item.admin)}>
                                   <Text style={styles.detailsText} > {item.admin? "Desautorizar" :"Autorizar" } </Text>
                        </Pressable>     
                      }       
                      </View>
                    </View>
                  </View>
                )}/>}
              </View>
              <View>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelBText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
    <MessageDialog/>
  </>
  );
}