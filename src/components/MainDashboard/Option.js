import React, { useState } from 'react';
import '../styles/Option.css';
import MySelect from './MySelect';
import makeAnimated from 'react-select/animated';
import { components } from 'react-select';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type='checkbox'
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated();

// Main Component
export default function DropDownOption({ posts, setPosts }) {
  const [dropdown, setDropdown] = useState({
    // year: [2022, 2021, 2020, 2019],
    year: [],
    month: [
      // { label: 'Jan', value: 'Jan', category: 'month' },
      // { label: 'Feb', value: 'Feb', category: 'month' },
      // { label: 'Mar', value: 'Mar', category: 'month' },
      // { label: 'Apr', value: 'Apr', category: 'month' },
    ],
    technology: [
      // { label: 'AWS', value: 'AWS', category: 'technology' },
      // { label: 'Salesforce', value: 'Salesforce', category: 'technology' },
    ],
    company: [
      // { label: 'TCS', value: 'TCS', category: 'company' },
      // { label: 'Infosys', value: 'Infosys', category: 'company' },
    ],
  });

  const [optionSelected, setOptionSelected] = useState();

  const handleChange = (selected) => {
    // console.log({ selected });
    // if (selected.category === 'sentiment') {
    //   let filtPost =
    //     !!posts.length &&
    //     posts.filter((post) => {
    //       console.log(post.sentiment);
    //       return post.sentiment === selected?.[0]?.value;
    //     });
    //   console.log({ filtPost });
    // }
  };

  return (
    <>
      <div className='Option_Main'>
        <div className='Option_Heading'>Monthly Reportage</div>
        <div className='Option_List'>
          <select class='form-select' aria-label='Default select example'>
            <option value=''>Year</option>
            {dropdown?.year.map((menu, indx) => {
              return (
                <option
                  value={menu}
                  key={indx}
                  selected={menu === new Date().getFullYear() && true}
                >
                  {menu}
                </option>
              );
            })}
          </select>
          <MySelect
            options={dropdown?.month}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option, MultiValue, animatedComponents }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
            placeholder='Month'
          />
          <select class='form-select' aria-label='Default select example'>
            <option selected>Entity</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
          <MySelect
            options={dropdown?.company}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option, MultiValue, animatedComponents }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
            placeholder='Company'
          />
          <MySelect
            options={dropdown?.technology}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option, MultiValue, animatedComponents }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
            placeholder='Technology'
          />
          <select class='form-select' aria-label='Default select example'>
            <option selected>Partner</option>
          </select>
        </div>
      </div>
    </>
  );
}
