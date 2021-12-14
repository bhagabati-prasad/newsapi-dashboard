import React from "react";
import "../styles/Option.css";
export default function Option() {
  return (
    <>
      <div className="Option_Main">
        <div className="Option_Heading">Monthly Reportage</div>
        <div className="Option_List">
          <select class="form-select" aria-label="Default select example">
            <option selected>Year</option>
            <option value="1">2020</option>
            <option value="2">2021</option>
            <option value="3">2022</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Month</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Technology</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Company</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Entity</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Partner</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </>
  );
}
