import React, { useState } from "react";
import { Component, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { post as actionPost } from '../../redux/action'
import { calc, time } from '../../tool'
// import ErrorBoundary from 'errorBoundary'
import styled from 'styled-components'
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Round as PageRound, Btn } from '../../component'

const styles = StyleSheet.create({
  toStyle: {
    backgroundColor: '#37688c',
    elevation: 8,
    width: 60,
    height: 30,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    marginVertical: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 250,
    height: 300,
    justifyContent: "center",
    margin: 20,
    backgroundColor: "#785634",
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


// margin: 5px;
const StyledViewContainer = styled(View)`  
  backgroundColor: #77d8cc;
  height: 55px;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  `
const StyledViewRow = styled(View)`  
  backgroundColor: #f7d8cc;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  `

const PostBar: React.FC<IState2Prop & IDispatch2Prop & Props> = function (props) {

  const [modalVisible, setModalVisible] = useState(false);

  const openCategory = () => {
    setModalVisible(true)
  }

  // console.log(`props.postPageCurrent:${props.postPageCurrent}`)
  // console.log(`props.postPaginateExt:${props.postPaginateExt}`)
  // console.log(`props.postTotalDocs:${props.postTotalDocs}`)
  // console.log(`props.postPageSize:${props.postPageSize}`)

  return (
    <StyledViewContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <Btn
              toStyle={styles.openButton}
              txtStyle={styles.textStyle}
              onPress={() => {
                setModalVisible(false);
              }}
              title='in modal'
            >
            </Btn>
          </View>
        </View>
      </Modal>

      <Btn
        toStyle={styles.toStyle}
        txtStyle={styles.txtStyle}
        onPress={() => null}
        title='Add' />
      
      <StyledViewRow>
        <PageRound current={props.postPageCurrent} ext={props.postPaginateExt} totalDocs={props.postTotalDocs} pageSize={props.postPageSize} nav={props.nav}></PageRound>
        <Btn
          toStyle={styles.toStyle}
          txtStyle={styles.txtStyle}
          onPress={openCategory}
          title='Category' />
      </StyledViewRow>

    </StyledViewContainer>
  )
}
interface Props {
  navigation: any,
  route: any
}
interface ICategoryItem {
  idStr: string,
  name: string,
}
interface IState2Prop {
  user: any,
  words: any,
  postPageSize: number,
  postTotalDocs: number,
  postPageCurrent: number,
  postPaginateExt: number,
}
interface IDispatch2Prop {
  changePageSize: (v?: any) => void,
  categoryNav: (v?: any) => void,
  nav: (v: any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  user: state.user,
  postPageSize: state.post.postPageSize,
  postPageCurrent: state.post.postPageCurrent,
  postTotalDocs: state.post.postTotalDocs,
  postPaginateExt: state.post.postPaginateExt,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  changePageSize: (v) => dispatch(actionPost.Creator.postChangePageSize(v)),
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
  nav: (v) => dispatch(actionPost.Creator.postNav(v))
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(postList))
export default
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(PostBar)
