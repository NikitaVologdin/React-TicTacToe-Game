import { useState } from "react"
import OOutlineIcon from "./icons/OOutlineIcon"
import XOutlineIcon from "./icons/XOutlineIcon"
import { motion } from "motion/react"
import { useNavigate } from "react-router"
import {
  setFirstPlayersMark,
  setSecondPlayersMark,
  setGameMode,
  setStartGame,
  firstPlayersMarkSelector,
} from "../app/features/configSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import XIcon from "./icons/XIcon"
import OIcon from "./icons/OIcon"

export default function PickMark() {
  const firstPlayersMark = useAppSelector(firstPlayersMarkSelector)
  const dispatch = useAppDispatch()
  const [sliderHovered, setSliderHovered] = useState(false)
  const navigate = useNavigate()

  const isXselected = firstPlayersMark === "x"
  const isOselected = firstPlayersMark === "o"

  function clickHandler(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    const { htmlFor: id } = event.currentTarget
    if (id === "x") {
      dispatch(setFirstPlayersMark("x"))
      dispatch(setSecondPlayersMark("o"))
    }
    if (id === "o") {
      dispatch(setFirstPlayersMark("o"))
      dispatch(setSecondPlayersMark("x"))
    }
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { id } = event.currentTarget
    if (id === "x") {
      dispatch(setFirstPlayersMark("x"))
      dispatch(setSecondPlayersMark("o"))
    }
    if (id === "o") {
      dispatch(setFirstPlayersMark("o"))
      dispatch(setSecondPlayersMark("x"))
    }
  }

  function hoverStartHandler() {
    setSliderHovered(true)
  }

  function hoverEndHandler() {
    setSliderHovered(false)
  }

  function chooseOpponentHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const { id } = event.currentTarget
    if (id === "cpu") {
      dispatch(setGameMode("cpu"))
    }
    if (id === "player") {
      dispatch(setGameMode("player"))
    }
    dispatch(setStartGame(true))
    // document.startViewTransition(() => {
    // })
    navigate("/game")
  }

  return (
    <div className="pick">
      <form className="pick__form">
        <fieldset className="pick__fieldset">
          <legend className="pick__legend">PICK PLAYER 1’S MARK</legend>
          <div className="pick-radio">
            <div className="pick-radio__control radio-control">
              <motion.label
                htmlFor="x"
                className="radio-control__label"
                onClick={clickHandler}
                onHoverStart={hoverStartHandler}
                onHoverEnd={hoverEndHandler}
                id="byx"
                aria-label="Select X mark"
              >
                <input
                  type="radio"
                  id="x"
                  className="radio-control__input"
                  checked={firstPlayersMark === "x" ? true : false}
                  onChange={changeHandler}
                  aria-labelledby="byx"
                />
                {isXselected ? (
                  <XOutlineIcon
                    className={"pick__icon"}
                    size={32}
                    stroke=""
                    fill="var(--dark-navy)"
                  />
                ) : (
                  <XIcon
                    className={"pick__icon"}
                    size={32}
                    fill="var(--silver)"
                  />
                )}
              </motion.label>
            </div>
            <div className="radio-control">
              <motion.label
                htmlFor="o"
                className="radio-control__label"
                onClick={clickHandler}
                onHoverStart={hoverStartHandler}
                onHoverEnd={hoverEndHandler}
                id="byo"
                aria-label="Select O mark"
              >
                <input
                  type="radio"
                  id="o"
                  className="radio-control__input"
                  checked={firstPlayersMark === "o" ? true : false}
                  onChange={changeHandler}
                  aria-labelledby="byo"
                />
                {isOselected ? (
                  <OOutlineIcon
                    className={"pick__icon"}
                    size={32}
                    stroke=""
                    fill="var(--dark-navy)"
                  />
                ) : (
                  <OIcon
                    className={"pick__icon"}
                    size={32}
                    fill="var(--silver)"
                  />
                )}
              </motion.label>
            </div>
            <motion.div
              className="pick-radio__switcher"
              animate={{
                x: firstPlayersMark === "x" ? "0" : "94%",
                backgroundColor: sliderHovered ? "#DBE8ED" : "#A8BFC9",
                transition: {
                  x: { type: "spring", duration: 0.6 },
                  backgroundColor: { duration: 0.3, ease: "easeInOut" },
                },
              }}
            ></motion.div>
          </div>
          <strong className="pick__reminder">REMEMBER : X GOES FIRST</strong>
        </fieldset>
      </form>
      <div className="pick__controls">
        <button
          className="pick__button button-cpu"
          id="cpu"
          onClick={chooseOpponentHandler}
        >
          NEW GAME (VS CPU)
        </button>
        <button
          className="pick__button button-player"
          id="player"
          onClick={chooseOpponentHandler}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  )
}
