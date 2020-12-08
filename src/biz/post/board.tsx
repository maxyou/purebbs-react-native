import React, { useState } from 'react'
import { Component, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { post as actionPost, sys as actionSys } from '../../redux/action'
import { ICategoryItem } from '../../common'
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
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

// background-color: lightgreen;
// padding-top: 10px;
// padding-left: 20px;
// justify-content: center;
// align-items: center;
const StyledDivCategory = styled(View)`
`


const Board: React.FC<IState2Prop & IDispatch2Prop & IProp> = function (props) {

  const themeContext = useContext(ThemeContext);
  // const { category, categoryCurrent } = props
  // const prevProps: IState2Prop = usePrevious({ category, categoryCurrent })

  useEffect(
    () => {
      console.log('board useEffect run categoryGet')
      props.categoryGet()
      // console.log()
      // if (
      //   (!prevProps)
      //   || (prevProps.category != props.category)
      //   || (prevProps.categoryCurrent != props.categoryCurrent)
      // ) {
      //   props.categoryGet()
      // }
    }, []
  )

  function currentMatch(current: string, idStr: string) {
    if (current === idStr) {
      return true
    }
    if (!current && idStr === props.category[0].idStr) {
      return true
    }
    return false
  }

  const styles = (props: any) => StyleSheet.create({
    toStyle: {
      backgroundColor: props.category.unSelected,
      elevation: 8,
      width: 160,
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
    toStyle_selected: {
      backgroundColor: props.category.selected,
      elevation: 8,
      width: 160,
      height: 30,
      borderRadius: 5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    txtStyle_selected: {
      textAlign: 'center',
      marginVertical: 8,
    },

  });


  function onPress(idStr:string){
    props.categoryNav(idStr)
    props.categorySelected()
  }

  return (
    <StyledDivCategory>

      {props.category ? props.category.map((v) => {
        console.log('in board')
        console.log(v)
        return (
          <Btn
            onPress={() => onPress(v.idStr)} title={v.name}
            toStyle={currentMatch(props.categoryCurrent, v.idStr) ? styles(themeContext).toStyle_selected : styles(themeContext).toStyle}
            txtStyle={currentMatch(props.categoryCurrent, v.idStr) ? styles(themeContext).txtStyle_selected : styles(themeContext).txtStyle}
          />
        )
      }) : null}

    </StyledDivCategory>
  );
}
interface IProp {
  categorySelected: () => void,
}
interface IState2Prop {
  user: any,
  words: any,
  categoryCurrent: string,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  categoryNav: (v?: any) => void,
  categoryGet: (v?: any) => void,
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  words: state.locale.words,
  user: state.user,
  category: state.sys.category,
  categoryCurrent: state.post.categoryCurrent,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  categoryNav: (v) => dispatch(actionPost.Creator.postCategoryNav(v)),
  categoryGet: (v) => dispatch(actionSys.Creator.categoryGet(v)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
