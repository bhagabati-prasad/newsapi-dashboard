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
export default function DropDownOption({ origPosts, filtPosts, setFiltPosts }) {
  const [dropdown, setDropdown] = useState({
    year: [2022, 2021, 2020, 2019],
    // year: [],
    month: [
      { label: 'Jan', value: '01', category: 'month' },
      { label: 'Feb', value: '02', category: 'month' },
      { label: 'Mar', value: '03', category: 'month' },
      { label: 'Apr', value: '04', category: 'month' },
      { label: 'May', value: '05', category: 'month' },
      { label: 'Jun', value: '06', category: 'month' },
      { label: 'Jul', value: '07', category: 'month' },
      { label: 'Aug', value: '08', category: 'month' },
      { label: 'Sep', value: '09', category: 'month' },
      { label: 'Oct', value: '10', category: 'month' },
      { label: 'Nov', value: '11', category: 'month' },
      { label: 'Dec', value: '12', category: 'month' },
    ],
    technology: [
      { label: 'AWS', value: 'AWS', category: 'technology' },
      { label: 'Salesforce', value: 'Salesforce', category: 'technology' },
      { label: 'TCS', value: 'TCS', category: 'company' },
    ],
    company: [{ label: 'Infosys', value: 'Infosys', category: 'company' }],
  });

  const [optionSelected, setOptionSelected] = useState();
  console.log({ optionSelected });

  const handleMonthChange = (selected) => {
    let filtByMonth = [];
    if (!!selected.length) {
      selected.map((item) => {
        const filtItem = origPosts.filter((post) => {
          return post.created_on.split('-')?.[1] == item.value;
        });
        filtByMonth = [...filtByMonth, ...filtItem];
      });
      setFiltPosts(filtByMonth);
    } else {
      setFiltPosts(origPosts);
    }
  };

  const handleChange = (selected) => {
    let filtByToken = [];
    if (!!selected.length) {
      selected.map((item) => {
        const filtItem = origPosts.filter((post) => {
          return post.dictionary_token === item.value;
        });
        filtByToken = [...filtByToken, ...filtItem];
      });
      console.log(filtByToken);
      setFiltPosts(filtByToken);
    } else {
      setFiltPosts(origPosts);
    }
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
            onChange={handleMonthChange}
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
          <select class='form-select' aria-label='Default select example'>
            <option selected>Company</option>
            <option value='1'>TCS</option>
            <option value='2'>Infosys</option>
            <option value='3'>Tech Mahindra</option>
          </select>
          <select class='form-select' aria-label='Default select example'>
            <option selected>Technology</option>
            <option value='1'>AWS</option>
            <option value='2'>Salesforce</option>
          </select>
          <select class='form-select' aria-label='Default select example'>
            <option selected>Partner</option>
          </select>
        </div>
      </div>
    </>
  );
}
