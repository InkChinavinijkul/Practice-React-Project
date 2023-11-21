import { TextField } from "@mui/material"
import CustomButton from "@src/resource/components/CustomButton"
import CustomInput from "@src/resource/components/CustomInput"
import { checkLS, isNaNReturnZero } from "@src/resource/utilities"
import React, { useState, useEffect } from "react"

interface IGameCellProps {
  rowIndex: number
  colIndex: number
  toggleCell: () => void
  cellState: boolean
  cellSize: number
}

interface IGameSave {
  saveName: string
  rows: number
  cols: number
  grid: boolean[][]
}

interface IFullGrid {
  saves: IGameSave[]
}
const lsKey = "gol-grid"

const GOL_COMMON_DISPLAY = {
  display: "flex",
  justifyContent: "center"
}

const generateGrid = (
  rows: number,
  cols: number,
  allCellAlive = false,
  random = false
) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      random ? Math.random() < 0.2 : allCellAlive
    )
  )
}

// uhh right way to memo?
// also i'd put these in a separate folder in larger projects (and if i actually reuse them)
const GameCell = React.memo((props: IGameCellProps): JSX.Element => {
  const { rowIndex, colIndex, toggleCell, cellState, cellSize } = props
  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      onClick={toggleCell}
      style={{
        width: cellSize,
        height: cellSize,
        border: "1px solid #ccc",
        backgroundColor: cellState ? "skyblue" : "white"
      }}
    />
  )
})

const GameOfLife = () => {
  const [numRows, setNumRows] = useState<number>(10)
  const [numCols, setNumCols] = useState<number>(10)
  const [newNumRow, setNewNumRow] = useState<number>(numRows) // yea i don't like this
  const [newNumCol, setNewNumCol] = useState<number>(numCols) // yea i don't like this
  const [gameSaves, setGameSaves] = useState<IGameSave[]>([])
  const [saveName, setSaveName] = useState<string>("")
  const [cellSize, setCellSize] = useState<number>(35)
  const [selectSaveName, setSelectSaveName] = useState<string>("No Save Found")
  const [gameGrid, setGameGrid] = useState<boolean[][]>(
    generateGrid(numRows, numCols, false, true)
  )
  const [isSimming, setIsSimming] = useState<boolean>(false)

  // get save files
  // only need to run once to get the value then we just use gameSaves
  // probably should switch to some lazy query for large array and if we have database
  useEffect(() => {
    if (!checkLS(lsKey)) return
    const { saves } = JSON.parse(localStorage.getItem(lsKey)!) // for ref: dis called postfix !

    if (!saves.length) return
    setGameSaves(saves)
    setSelectSaveName(saves[0])
  }, [])

  const calcNextMove = (inputGrid: boolean[][]) => {
    return inputGrid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = [
          inputGrid[i - 1]?.[j - 1],
          inputGrid[i - 1]?.[j],
          inputGrid[i - 1]?.[j + 1],
          inputGrid[i]?.[j - 1],
          inputGrid[i]?.[j + 1],
          inputGrid[i + 1]?.[j - 1],
          inputGrid[i + 1]?.[j],
          inputGrid[i + 1]?.[j + 1]
        ].filter((neighbor) => neighbor !== undefined)

        const numAliveNeighbors = neighbors.filter(
          (neighbor) => neighbor
        ).length

        if (cell && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
          return false
        } else if (!cell && numAliveNeighbors === 3) {
          return true
        } else {
          return cell
        }
      })
    )
  }

  useEffect(() => {
    // update grid
    if (isSimming) {
      // actually need to use the "alternate form" of setState
      // for some reason the whole interval thing would work
      // without making use of prevState
      const updateGrid = () => {
        setGameGrid((prevGrid) => calcNextMove(prevGrid))
      }

      // update grid using setInterval
      const intervalId = setInterval(updateGrid, 500)

      return () => clearInterval(intervalId)
    }
  }, [isSimming])

  const resetGrid = () => {
    setGameGrid(generateGrid(numRows, numCols))
    setIsSimming(false)
  }

  // much simpler with somewhere to actually store data
  const saveGrid = (saveName: string) => {
    setIsSimming(false)

    const saveNameList = gameSaves.map(({ saveName }) => saveName)
    if (saveNameList.includes(saveName)) {
      alert("Save name already exist!")
      return
    }

    // JSON.parse(JSON.stringify(object)) - og way to full clone
    const newSaves = structuredClone(gameSaves) // ez
    newSaves.push({ saveName, grid: gameGrid, rows: numRows, cols: numCols }) // push returns number, so lazy 2 liner

    const fullGrid: IFullGrid = {
      saves: newSaves
    }
    setGameSaves(newSaves)
    localStorage.setItem(lsKey, JSON.stringify(fullGrid))
  }

  const loadGrid = (saveName: string) => {
    setIsSimming(false)

    const saveNameList = gameSaves.map(({ saveName }) => saveName)
    const index = saveNameList.indexOf(saveName)
    if (index < 0) {
      alert("nice try guy")
      return
    }
    const { rows, cols, grid } = gameSaves[index]
    setNumRows(rows)
    setNumCols(cols)
    setGameGrid(grid)
  }

  // surprisingly more complex than expected (deep cloning)
  const deleteSave = (saveName: string) => {
    // no need to stop simming here
    const saveNameList = gameSaves.map(({ saveName }) => saveName)
    const removedIndex = saveNameList.indexOf(saveName)
    const newSaves = structuredClone(gameSaves)
    newSaves.splice(removedIndex, 1)

    setGameSaves(newSaves)
    const fullGrid: IFullGrid = {
      saves: newSaves
    }
    localStorage.setItem(lsKey, JSON.stringify(fullGrid))
  }

  const randomizeGrid = () => {
    setIsSimming(false)
    setGameGrid(generateGrid(numRows, numCols, false, true))
  }

  const toggleCell = (row: number, col: number) => {
    setIsSimming(false)

    const newGrid = [...gameGrid]
    newGrid[row][col] = !newGrid[row][col]
    setGameGrid(newGrid)
  }

  return (
    <div>
      <h1 style={{ ...GOL_COMMON_DISPLAY, letterSpacing: ".15rem" }}>
        Game of Life
      </h1>
      <h3 style={{ ...GOL_COMMON_DISPLAY }}>
        Status :{"\u00A0"}
        <span style={{ color: isSimming ? "darkgreen" : "red" }}>
          {`${isSimming ? "Simulating" : "Nope"}`}
        </span>
      </h3>
      <div
        id="game-grid"
        style={{
          ...GOL_COMMON_DISPLAY,
          display: "grid", // can use gridTemp itself to "simulate" MUI Grid behaviour
          gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`
        }}
      >
        {gameGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              rowIndex={rowIndex}
              colIndex={colIndex}
              toggleCell={() => toggleCell(rowIndex, colIndex)}
              cellState={cell}
              cellSize={cellSize}
            />
          ))
        )}
      </div>
      <div id="buttons" style={{ ...GOL_COMMON_DISPLAY }}>
        <CustomButton onClick={() => setIsSimming(!isSimming)}>
          {isSimming ? "Stop Simulation" : "Start Simulation"}
        </CustomButton>
        <CustomButton onClick={resetGrid}>Reset</CustomButton>
        <CustomButton onClick={randomizeGrid}>Randomize</CustomButton>
      </div>
      <div
        id="options-container"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        <div className="dummy" />
        <div
          id="dimensions"
          style={{
            ...GOL_COMMON_DISPLAY,
            alignItems: "center", // this actually doesn't align button with input
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div
            style={{
              ...GOL_COMMON_DISPLAY,
              width: "100%"
            }}
          >
            <TextField
              label="Cell Size"
              value={cellSize}
              onChange={(e) => setCellSize(+isNaNReturnZero(+e.target.value))}
              // sx={{ width: "300px" }}
              title="last thing i'm putting in and i'm getting pretty\
				 				sick and tired of html elements at this point so i'm\ 
				 				cheating a bit here sorry! also could add another button\
				 				to confirm changing cell size but fk it"
            />
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              // hurr wtf is this shit
              // i need the old values to properly save the current state of the board
              // values from input should not affect that
              // there's definitely a better way to do this...
              // my solution - save it as an object
              // object contains row, col, and the board itself
              // EDIT: i did exactly that, not changing this code (ever?)
              //	it's late, i'm sleepy
              setNumRows(newNumRow)
              setNumCols(newNumCol)
              setIsSimming(false)
              const newGrid = generateGrid(newNumRow, newNumCol, false, true)
              setGameGrid(newGrid)
            }}
            style={{
              // this "somehow" aligned submit with input elements
              // without it submit goes to next line
              display: "flex"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "16px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <label aria-label="num-rows">Rows</label>
                <CustomInput
                  type="number"
                  aria-label="new-num-rows"
                  value={newNumRow}
                  onChange={(e) => {
                    setNewNumRow(isNaNReturnZero(+e.target.value))
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <label aria-label="num-rows">Columns</label>
                <CustomInput
                  type="number"
                  aria-label="new-num-cols"
                  value={newNumCol}
                  onChange={(e) => {
                    setNewNumCol(isNaNReturnZero(+e.target.value))
                  }}
                />
              </div>
            </div>
            <CustomButton>Submit</CustomButton>
          </form>
        </div>
        <div
          id="manage-saves"
          style={{
            ...GOL_COMMON_DISPLAY,
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              saveGrid(saveName)
            }}
          >
            <label aria-label="save-name">Save Name</label>
            <CustomInput
              type="text"
              aria-label="save-name-input"
              value={saveName}
              onChange={(e) => {
                setSaveName(e.target.value)
              }}
            />
            <CustomButton onClick={() => saveGrid}>Save State</CustomButton>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              loadGrid(selectSaveName)
            }}
            // this aligns the form to the center of its container
            // however it also pushes the other container to the left
            // can prolly fix this using display flex instead of grid
            // on the large container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <select
              value={selectSaveName}
              id="load-save"
              onChange={(e) => setSelectSaveName(e.target.value)}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid gray",
                borderRadius: "20px",
                padding: "5px 10px",
                height: "max-content", // limits height of input, otherwise it matches button
                maxWidth: "30%"
              }}
            >
              {gameSaves.length ? (
                gameSaves.map(({ saveName }) => (
                  <option value={saveName}>{saveName}</option>
                ))
              ) : (
                <option value={"No Save Found"}>{"No Save Found"}</option>
              )}
            </select>
            <CustomButton>Load Save</CustomButton>
            <CustomButton
              type="button"
              onClick={() => deleteSave(selectSaveName)}
            >
              Delete Save
            </CustomButton>
          </form>
        </div>
        <div className="dummy" />
      </div>
    </div>
  )
}

export default GameOfLife
