import React, { useRef, useState } from "react";
import { createChatCompletions } from "./../Services/gpt-service";

function ReviewForm() {
  let text;

  const age = useRef();
  const emotion = useRef();
  const hotel = useRef();
  const keyPoints = useRef();
  const rating = useRef();
  const lengthOfReview = useRef();
  const tone = useRef();

  const [count, setCount] = useState(1);
  const [gender, setGender] = useState("Male");
  const [isEmptyHotelName, setIsEmptyHotelName] = useState(false);
  const [isEmptyKeyPoints, setIsEmptyKeyPoints] = useState(false);
  const [isGenerateButtonEnabled, setIsGenerateButtonEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewFieldDisplay, setIsReviewFieldDisplay] = useState(false);
  const [review, setReview] = useState("");

  /* const copyToClipboard = () => {
    if (review) {
      navigator.clipboard.writeText(review);
    }
  }; */

  const getGender = (event) => {
    setGender(event.target.value);
  };

  const inputValidations = (choice) => {
    if (choice === "hotel") {
      setIsEmptyHotelName(true);
      if (hotel.current.value.length !== 0) {
        setIsEmptyHotelName(false);
      }
    }

    if (choice === "keyPoints") {
      setIsEmptyKeyPoints(true);
      if (keyPoints.current.value.length !== 0) {
        setIsEmptyKeyPoints(false);
      }
    }
    onDisplayGenerateButton();
  };

  const onDisplayGenerateButton = () => {
    if (
      hotel.current.value.length !== 0 &&
      keyPoints.current.value.length !== 0
    ) {
      setIsGenerateButtonEnabled(true);
    } else {
      setIsGenerateButtonEnabled(false);
    }
  };

  const onDisplayWaitingScreen = () => {
    setCount(count + 1);
    setIsLoading(true);
    setIsReviewFieldDisplay(false);
  };

  const onReviewFormSubmitted = (event) => {
    event.preventDefault();
    onDisplayWaitingScreen();
    prepareText();
    onSendPreparedTextToGPT(text);
    if (count >= 2) {
      resetForm();
      setIsGenerateButtonEnabled(false);
    }
  };

  const onSendPreparedTextToGPT = (text) => {
    createChatCompletions(text).then((result) => {
      setReview(result.data.choices[0].message.content);
      setIsReviewFieldDisplay(true);
      setIsLoading(false);
    });
  };

  const prepareText = () => {
    text =
      "I am " +
      gender +
      " aged " +
      age.current.value +
      ". Write " +
      rating.current.value +
      " easy to read max " +
      lengthOfReview.current.value +
      " review for " +
      hotel.current.value +
      " hotel having " +
      tone.current.value +
      " tone, expresses " +
      emotion.current.value +
      " emotions." +
      keyPoints.current.value +
      ".";
    return text;
  };

  const resetForm = () => {
    age.current.value = "18-24";
    hotel.current.value = "";
    emotion.current.value = "Very Happy";
    tone.current.value = "Curious";
    lengthOfReview.current.value = "75 words";
    rating.current.value = "5 star";
    keyPoints.current.value = "";
  };

  return (
    <>
      <div className="row">
        <div className="col-7 mx-auto shadow rounded">
          <form onSubmit={onReviewFormSubmitted}>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Gender :</label>
              </div>
              <div className="col-2 form-check mx-2">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="Male"
                    onChange={getGender}
                  />
                  Male
                </label>
              </div>
              <div className="col-2 form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="Female"
                    onChange={getGender}
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Age Group :</label>
              </div>
              <div className="col-4">
                <select
                  className="form-select shadow-sm"
                  name="ageGroup"
                  ref={age}>
                  <option defaultValue="18-24">18-24 </option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-64">55-64</option>
                  <option value="65-100">65 and older</option>
                </select>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                {isEmptyHotelName || <label>Hotel Name :</label>}
                {isEmptyHotelName && (
                  <label className="text-danger">
                    Please enter hotel name:
                  </label>
                )}
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control shadow-sm"
                  name="hotelName"
                  maxLength="30"
                  ref={hotel}
                  onBlur={() => {
                    inputValidations("hotel");
                  }}
                />
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Overall Experience :</label>
              </div>
              <div className="col-4">
                <select
                  className="form-select shadow-sm"
                  name="overallExperience"
                  ref={emotion}>
                  <option defaultValue="Very Happy">Very Happy</option>
                  <option value="Happy">Happy</option>
                  <option value="Sad">Sad</option>
                  <option value="Angry">Angry</option>
                </select>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Tone of Review :</label>
              </div>
              <div className="col-4">
                <select
                  className="form-select shadow-sm"
                  name="toneOfReview"
                  ref={tone}>
                  <option defaultValue="Curious">Curious</option>
                  <option value="Formal">Formal</option>
                  <option value="Informal">Informal</option>
                  <option value="Angry">Angry</option>
                </select>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Review Length :</label>
              </div>
              <div className="col-4">
                <select
                  className="form-select shadow-sm"
                  name="reviewLength"
                  ref={lengthOfReview}>
                  <option defaultValue="50 words">Short (50 words)</option>
                  <option value="75 words">Medium (75 words)</option>
                </select>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-3">
                <label>Rating :</label>
              </div>
              <div className="col-4">
                <select
                  className="form-select shadow-sm"
                  name="starRating"
                  ref={rating}>
                  <option defaultValue="5 star">5 star</option>
                  <option value="4 star">4 star</option>
                  <option value="3 star">3 star</option>
                  <option value="2 star">2 star</option>
                  <option value="1 star">1 star</option>
                </select>
              </div>
            </div>
            <div className="row p-2 align-items-center">
              <div className="col-6">
                {isEmptyKeyPoints || (
                  <label>Specific Points that this review should cover :</label>
                )}
                {isEmptyKeyPoints && (
                  <label className="text-danger">
                    Please enter specific Points that this review should cover :
                  </label>
                )}
              </div>
              <div className="row mt-2">
                <div className="col-8">
                  <textarea
                    className="form-control shadow-sm"
                    name="reviewPoints"
                    rows="2"
                    maxLength="60"
                    ref={keyPoints}
                    onBlur={() => {
                      inputValidations("keyPoints");
                    }}></textarea>
                </div>
              </div>
            </div>
            <div className="row mx-1">
              <div className="col-4">
                <button
                  disabled={!isGenerateButtonEnabled}
                  type="submit"
                  className="btn btn-success shadow-sm my-2">
                  Generate
                </button>
              </div>
            </div>
            {isReviewFieldDisplay && (
              <div className="row p-2 align-items-center">
                <div className="col-8">
                  <label>
                    Please check the review generated by GPT below :
                  </label>
                </div>
                {/* <div className="col-4 text-center">
                  <button
                    className="btn btn-outline-success btn-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Copy To Clipboard"
                    onClick={copyToClipboard}>
                    <img src="clipboard.svg" alt="" width="40" height="40" />
                  </button>
                </div> */}
                <div className="row mt-2">
                  <div className="col-12">
                    <textarea
                      className="form-control shadow-sm"
                      name="review"
                      rows="6"
                      value={review}
                      onChange={(event) => {
                        setReview(event.target.value);
                      }}></textarea>
                  </div>
                </div>
              </div>
            )}
            {!isReviewFieldDisplay && isLoading && (
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="display-6">{"Please wait..."}</h1>
                </div>
              </div>
            )}
            <div className="row text-end my-1">
              <div className="col">
                <label>Powered by GPT AI </label>
                <img src="gptIcon.jpg" alt="" width="25" height="25" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReviewForm;
