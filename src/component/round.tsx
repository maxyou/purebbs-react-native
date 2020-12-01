import React from 'react'
import { calc } from '../tool'
import {
    View,
    Button,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import styled from 'styled-components'

const StyledViewContainner = styled(View)`
flexDirection: row;
justifyContent: center;
alignItems: center;
`
const StyledViewRow = styled(View)`
flexDirection: row;
justifyContent: center;
alignItems: center;
`

interface IState2Prop {
    ext: any,
    current: number,
    pageSize: number,
    totalDocs: number,
}
interface IDispatch2Prop {
    nav: (v: number) => void,
}

function PageRound({ current, ext, totalDocs, pageSize, nav }: IState2Prop & IDispatch2Prop) {

    // console.log('-------------pageRound---------------')
    // console.log(current)
    // console.log(ext)
    // console.log(totalDocs)
    // console.log(pageSize)
    // if(!pageSize) {pageSize=10}
    var maxRight = Math.ceil(totalDocs / pageSize)
    if (!maxRight) { maxRight = 1 }


    const ba: number[] = calc.calcPaginateArray(current, ext, maxRight)
    // console.log(current)
    // console.log(ext)
    // console.log(maxRight)
    // console.log(ba)

    return (
        <StyledViewContainner>

            {ba[0] === 1 ?
                null
                : <StyledViewRow>
                    <Button onPress={() => nav(1)} title={'' + 1} />
                    {ba[0] === 2 ? null : <Text>...</Text>}
                </StyledViewRow>}

            {ba.map((item) => <Button
                key={item}
                onPress={() => nav(item)}
                disabled={item === current}
                title={'' + item}
            />)}

            {ba[ba.length - 1] === maxRight ?
                null
                : <StyledViewRow>
                    {ba[ba.length - 1] === maxRight - 1 ?
                        null
                        : <Text>...</Text>}
                    <Button onPress={() => nav(maxRight)} title={'' + maxRight} />
                </StyledViewRow>}

        </StyledViewContainner>
    );
}

export default PageRound