import React, { useState } from 'react';
import '../styles/Option.css';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import filterArray from 'multi-filter-array';

export default function DropDownOption({ origPosts, filtPosts, setFiltPosts }) {
  const [dropdown, setDropdown] = useState({
    year: [2022, 2021, 2020, 2019],
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
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('01');
  const [token, setToken] = useState('');

  const [optionDropdown, setOptionDropdown] = useState([
    // {
    //   label: 'year',
    //   children: [
    //     { label: '2021', value: '2021' },
    //     { label: '2020', value: '2020' },
    //     { label: '2019', value: '2019' },
    //   ],
    // },
    // {
    //   label: 'month',
    //   children: [
    //     { label: 'Jan', value: '01', category: 'month' },
    //     { label: 'Feb', value: '02', category: 'month' },
    //     { label: 'Mar', value: '03', category: 'month' },
    //     { label: 'Apr', value: '04', category: 'month' },
    //     { label: 'May', value: '05', category: 'month' },
    //     { label: 'Jun', value: '06', category: 'month' },
    //     { label: 'Jul', value: '07', category: 'month' },
    //     { label: 'Aug', value: '08', category: 'month' },
    //     { label: 'Sep', value: '09', category: 'month' },
    //     { label: 'Oct', value: '10', category: 'month' },
    //     { label: 'Nov', value: '11', category: 'month' },
    //     { label: 'Dec', value: '12', category: 'month' },
    //   ],
    // },
    {
      label: 'token',
      children: [
        { label: 'Wipro', value: 'Wipro', category: 'dictionary_token' },
        { label: 'TCS', value: 'TCS', category: 'dictionary_token' },
        { label: 'AI', value: 'AI', category: 'dictionary_token' },
        { label: 'Infosys', value: 'Infosys', category: 'dictionary_token' },
      ],
    },
  ]);

  const handleYearChange = (e) => {
    if (!!e.target.value) {
      setMonth(`${e.target.value}-`);
      const postsByYear = origPosts.filter((post) =>
        post.created_on.includes(`${e.target.value}-`)
      );
      // console.log(postsByYear);
      setFiltPosts(postsByYear);
    } else {
      setFiltPosts(origPosts);
    }
  };

  const handleChangeMonth = (e) => {
    if (!!e.target.value) {
      setMonth(`-${e.target.value}-`);
      const postsByMonth = origPosts.filter((post) =>
        post.created_on.includes(`${year}-${e.target.value}-`)
      );
      console.log({ postsByMonth });
      setFiltPosts(postsByMonth);
    } else {
      setFiltPosts(origPosts);
    }
  };

  // const onChange = (currentNode, selectedNodes) => {
  //   const filtByNode = selectedNodes.map((node) =>
  //     filterArray(filtPosts, [
  //       (person) => person.created_on.includes(month),
  //       (person) => person.dictionary_token == node.value,
  //     ])
  //   );
  //   const filteredPosts = filtByNode.flat(Infinity);
  //   console.log('--filt by node--', filteredPosts);
  //   setFiltPosts(filteredPosts);
  // };

  const handleChangeToken = (e) => {
    if (e.target.value) {
      const filterByNode = filterArray(origPosts, [
        (person) => person.created_on.includes(year),
        (person) => person.created_on.includes(month),
        (person) => person.dictionary_token == e.target.value,
      ]);
      const filterByToken = filterByNode.flat(Infinity);
      console.log('filter by token--', filterByToken);
      setFiltPosts(filterByToken);
    } else {
      const postsByMonth = origPosts.filter((post) =>
        post.created_on.includes(`${year}${month}`)
      );
      setFiltPosts(postsByMonth);
      console.log('else part---', `${year}${month}`, postsByMonth);
    }
  };

  return (
    <>
      <div className='Option_Main'>
        <div className='Option_Heading'>Monthly Reportage</div>
        <div className='Option_List justify-content-start'>
          <select
            onChange={handleYearChange}
            className='form-select'
            aria-label='Default select example'
          >
            <option value=''>Year</option>
            {dropdown?.year.map((menu, indx) => {
              return (
                <option
                  value={menu}
                  key={indx}
                  selected={menu === year && true}
                >
                  {menu}
                </option>
              );
            })}
          </select>
          <select
            onChange={handleChangeMonth}
            className='form-select'
            aria-label='Default select example'
          >
            <option value=''>Month</option>
            {dropdown?.month.map((menu, indx) => {
              return (
                <option value={menu.value} key={indx}>
                  {menu.label}
                </option>
              );
            })}
          </select>
          <select
            onChange={handleChangeToken}
            className='form-select'
            aria-label='Default select example'
          >
            <option value=''>Company</option>
            <option value='Wipro'>Wipro</option>
            <option value='TCS'>TCS</option>
          </select>
          {/* <DropdownTreeSelect
            keepTreeOnSearch
            data={optionDropdown}
            onChange={onChange}
            className='mdl-demo'
          /> */}
          <select className='form-select' aria-label='Default select example'>
            <option selected>Entity</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
          <select className='form-select' aria-label='Default select example'>
            <option selected>Company</option>
            <option value='1'>TCS</option>
            <option value='2'>Infosys</option>
            <option value='3'>Tech Mahindra</option>
          </select>
          <select className='form-select' aria-label='Default select example'>
            <option selected>Technology</option>
            <option value='1'>AWS</option>
            <option value='2'>Salesforce</option>
          </select>
          <select className='form-select' aria-label='Default select example'>
            <option selected>Partner</option>
          </select>
        </div>
      </div>
    </>
  );
}
