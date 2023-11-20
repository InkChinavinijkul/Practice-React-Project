import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material"
import { isNaNReturnZero } from "@src/resource/utilities"
import { useState } from "react"

type ICounterNumberProps = {
  count: number
}

export const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => !props.includes(prop as string)

const CounterNumber = styled(Typography, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<ICounterNumberProps>(["count"], prop)
})<ICounterNumberProps>(({ count }) => ({
  color: count % 3 === 0 ? "red" : "blue",
  fontSize: 300 + (count % 100)
}))

const CounterButton = styled(Button, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<ICounterNumberProps>(["count"], prop)
})<ICounterNumberProps>(({ count }) => ({
  color: count % 3 === 0 ? "white" : "black",
  backgroundColor: count % 3 === 0 ? "purple" : "orange",
  "&:hover": {
    backgroundColor: count % 3 === 0 ? "lightpink" : "LightGoldenRodYellow"
  }
}))

// const AddX = () => {
// 	return
// }

const FunCounter = () => {
  const [count, setCount] = useState<number>(0)
  const [resetText, setResetText] = useState<string>("Reset Me")
  const [addX, setAddX] = useState<number>(1)

  const isMagicNumber = count % 100 === 69 // prolly better way to do this

  const handleCounterClick = (valToAdd = 1) => {
    setCount(count + valToAdd)
  }

  const handleReset = () => {
    setCount(0)
  }

  const handleChangeResetText = (text: string) => {
    setResetText(text)
  }

  return (
    <Grid container component={Box} sx={{ height: "100%", width: "100%" }}>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={12}
        columnSpacing={2}
      >
        <Grid item>
          <CounterButton
            onClick={() => handleCounterClick()}
            variant={"contained"}
            count={count}
          >
            {isMagicNumber ? "Nice" : "Add me"}
          </CounterButton>
        </Grid>
        <Grid item>
          <CounterButton
            onClick={handleReset}
            variant={"contained"}
            count={count}
            onMouseOver={() => handleChangeResetText("Please don't")}
            onMouseLeave={() => handleChangeResetText("Reset Me")}
          >
            {resetText}
          </CounterButton>
        </Grid>
        <Grid item>
          <CounterButton
            onClick={() => handleCounterClick(10)}
            variant={"contained"}
            count={count}
          >
            {isMagicNumber ? "Nice" : "Add 10"}
          </CounterButton>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" alignItems="center" xs={12}>
        {isMagicNumber ? (
          <CounterNumber count={count}>{count % 100}</CounterNumber>
        ) : null}
        <CounterNumber count={count}>{count}</CounterNumber>
        {isMagicNumber ? (
          <CounterNumber count={count}>{count % 100}</CounterNumber>
        ) : null}
      </Grid>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={12}
        columnSpacing={2}
      >
        <Grid item>
          <CounterButton
            onClick={() => handleCounterClick(-1)}
            variant={"contained"}
            count={count}
          >
            {isMagicNumber ? "Nice" : "Subtract me"}
          </CounterButton>
        </Grid>
        <Grid item>
          <CounterButton
            onClick={handleReset}
            variant={"contained"}
            count={count}
            onMouseOver={() => handleChangeResetText("Please don't")}
            onMouseLeave={() => handleChangeResetText("Reset Me")}
          >
            {resetText}
          </CounterButton>
        </Grid>
        <Grid item>
          <CounterButton
            onClick={() => handleCounterClick(-10)}
            variant={"contained"}
            count={count}
          >
            {isMagicNumber ? "Nice" : "Subtract 10"}
          </CounterButton>
        </Grid>
      </Grid>
      <Grid container item direction="column" justifyContent={"flex-end"}>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
        >
          <Grid item>
            <CounterButton
              onClick={() => handleCounterClick(-addX)}
              variant={"contained"}
              count={count}
            >
              {`- ${addX}`}
            </CounterButton>
          </Grid>
          <Grid item>
            <TextField
              value={isNaNReturnZero(addX)}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setAddX(isNaNReturnZero(+e.target.value))}
              sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
            />
          </Grid>
          <Grid item>
            <CounterButton
              onClick={() => handleCounterClick(addX)}
              variant={"contained"}
              count={count}
            >
              {`+ ${addX}`}
            </CounterButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FunCounter
