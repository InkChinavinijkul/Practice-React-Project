import React, { useState, useEffect } from "react"

const ROW = 10
const COL = 10
const CELL_SIZE = 50

const generateGrid = (defaultState = false, random = false) => {
	// return Array.from({ length: ROW }, () =>
	// 	Array(COL).fill(random ? Math.random() < 0.2 : defaultState)
	// )
	return Array.from({ length: ROW }, () =>
		Array.from({ length: COL }, () =>
			random ? Math.random() < 0.2 : defaultState
		)
	)
}

interface IGameCellProps {
	rowIndex: number
	colIndex: number
	toggleCell: () => void
	cellState: boolean
}

interface ICustomButtonProps {
	children?: React.ReactNode
	onClick: () => void
}

const GOL_COMMON_DISPLAY = {
	display: "flex",
	justifyContent: "center",
}

const GameCell = (props: IGameCellProps): JSX.Element => {
	const { rowIndex, colIndex, toggleCell, cellState } = props
	return (
		<div
			key={`${rowIndex}-${colIndex}`}
			onClick={toggleCell}
			style={{
				width: CELL_SIZE,
				height: CELL_SIZE,
				border: "1px solid #ccc",
				backgroundColor: cellState ? "skyblue" : "white",
			}}
		/>
	)
}

const CustomButton = (props: ICustomButtonProps) => {
	const { children, onClick } = props
	return (
		<button
			style={{
				backgroundColor: "white",
				color: "black",
				padding: "7.5px",
				margin: "20px 10px",
				border: "2px solid pink",
			}}
			onClick={onClick}>
			{children}
		</button>
	)
}

const GameOfLife = () => {
	const [gameGrid, setGameGrid] = useState<boolean[][]>(generateGrid)
	const [isSimming, setIsSimming] = useState<boolean>(false)

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
					inputGrid[i + 1]?.[j + 1],
				].filter((neighbor) => neighbor !== undefined)

				const numAliveNeighbors = neighbors.filter(
					(neighbor) => neighbor
				).length

				// Apply the rules of the Game of Life
				if (cell && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
					return false // Any live cell with fewer than two live neighbors dies
				} else if (!cell && numAliveNeighbors === 3) {
					return true // Any dead cell with exactly three live neighbors becomes a live cell
				} else {
					return cell // All other cells remain in the same state
				}
			})
		)
	}

	useEffect(() => {
		// Function to update the grid based on the Game of Life rules
		if (isSimming) {
			const updateGrid = () => {
				// setGameGrid((prevGrid) => {
				// 	return prevGrid.map((row, i) =>
				// 		row.map((cell, j) => {
				// 			const neighbors = [
				// 				prevGrid[i - 1]?.[j - 1],
				// 				prevGrid[i - 1]?.[j],
				// 				prevGrid[i - 1]?.[j + 1],
				// 				prevGrid[i]?.[j - 1],
				// 				prevGrid[i]?.[j + 1],
				// 				prevGrid[i + 1]?.[j - 1],
				// 				prevGrid[i + 1]?.[j],
				// 				prevGrid[i + 1]?.[j + 1],
				// 			].filter((neighbor) => neighbor !== undefined)

				// 			const numAliveNeighbors = neighbors.filter(
				// 				(neighbor) => neighbor
				// 			).length

				// 			// Apply the rules of the Game of Life
				// 			if (cell && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
				// 				return false // Any live cell with fewer than two live neighbors dies
				// 			} else if (!cell && numAliveNeighbors === 3) {
				// 				return true // Any dead cell with exactly three live neighbors becomes a live cell
				// 			} else {
				// 				return cell // All other cells remain in the same state
				// 			}
				// 		})
				// 	)
				// })
				setGameGrid((prevGrid) => calcNextMove(prevGrid))
			}

			// update grid using setInterval
			const intervalId = setInterval(updateGrid, 500)

			return () => clearInterval(intervalId)
		}
	}, [isSimming])

	const resetGrid = () => {
		setGameGrid(generateGrid())
		setIsSimming(false)
	}

	const saveGrid = () => {
		setIsSimming(false)
		localStorage.setItem("gol-grid", JSON.stringify(gameGrid))
	}

	const loadGrid = () => {
		setIsSimming(false)
		if (!localStorage.getItem("gol-grid")) {
			alert("Save not found! :(")
			return
		}
		const loadedGrid = JSON.parse(localStorage.getItem("gol-grid") || "")
		setGameGrid(loadedGrid)
	}

	const randomizeGrid = () => {
		setIsSimming(false)
		setGameGrid(generateGrid(false, true))
	}

	const toggleCell = (row: number, col: number) => {
		setIsSimming(false)

		const newGrid = [...gameGrid]
		newGrid[row][col] = !newGrid[row][col]
		setGameGrid(newGrid)
	}

	return (
		<div>
			<h1 style={{ ...GOL_COMMON_DISPLAY }}>Game of Life</h1>
			<h3 style={{ ...GOL_COMMON_DISPLAY }}>
				Status:{" "}
				<span style={{ color: isSimming ? "darkgreen" : "red" }}>
					{isSimming ? "Simulating" : "Nope"}
				</span>
			</h3>
			<div
				style={{
					...GOL_COMMON_DISPLAY,
					display: "grid",
					gridTemplateColumns: `repeat(${COL}, ${CELL_SIZE}px)`,
					// display: "flex",
					// justifyContent: "center",
				}}>
				{gameGrid.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<GameCell
							rowIndex={rowIndex}
							colIndex={colIndex}
							toggleCell={() => toggleCell(rowIndex, colIndex)}
							cellState={cell}
						/>
						// <div
						// 	key={`${rowIndex}-${colIndex}`}
						// 	onClick={() => toggleCell(rowIndex, colIndex)}
						// 	style={{
						// 		width: 50,
						// 		height: 50,
						// 		border: "1px solid #ccc",
						// 		backgroundColor: cell ? "black" : "white",
						// 	}}
						// />
					))
				)}
			</div>
			<div style={{ ...GOL_COMMON_DISPLAY }}>
				<CustomButton onClick={() => setIsSimming(!isSimming)}>
					{isSimming ? "Stop Simulation" : "Start Simulation"}
				</CustomButton>
				<CustomButton onClick={resetGrid}>Reset</CustomButton>
				<CustomButton onClick={saveGrid}>Save State</CustomButton>
				<CustomButton onClick={loadGrid}>Load State</CustomButton>
				<CustomButton onClick={randomizeGrid}>Randomize</CustomButton>
			</div>
		</div>
	)
}

export default GameOfLife

// const GAME_BOARD = []

// const GameOfLife = () => {
// 	return <div>test me</div>
// }

// export default GameOfLife
