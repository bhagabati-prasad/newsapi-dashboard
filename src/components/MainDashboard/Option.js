import React, { useState } from 'react';
import '../styles/Option.css';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import filterArray from 'multi-filter-array';

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
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('01');

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
      console.log(postsByMonth);
      setFiltPosts(postsByMonth);
    } else {
      setFiltPosts(origPosts);
    }
  };

  const onChange = (currentNode, selectedNodes) => {
    const filtByNode = selectedNodes.map((node) =>
      filterArray(filtPosts, [
        (person) => person.created_on.includes(month),
        (person) => person.dictionary_token == node.value,
      ])
    );
    const filteredPosts = filtByNode.flat(Infinity);
    console.log('--filt by node--', filteredPosts);
    // const selectedPosts = {
    //   month: [],
    //   company: [],
    // };
    // const filterArr = [];
    // selectedNodes.map((node) => filterArr.push(node.category));
    // // console.log({ filterArr });

    // const { created_on, dictionary_token } = origPosts;

    // selectedNodes.map((node) => {
    //   if (node.category === 'month') {
    //     origPosts.filter((post) => {
    //       const val = post?.created_on.includes(`-${node.value}-`);
    //       if (val) {
    //         selectedPosts.month.push(post);
    //       }
    //       return val;
    //     });
    //   }
    //   if (node.category === 'dictionary_token') {
    //     origPosts.filter((post) => {
    //       const val = post.dictionary_token === node.value;
    //       if (val) selectedPosts.company.push(post);
    //       return val;
    //     });
    //   }
    // });

    // const filteredPosts = origPosts.filter((post) => {
    //   return filterArr.every((key) => {
    //     if (selectedNodes && selectedNodes[key] && !selectedNodes[key].length)
    //       return true;
    //     if (Array.isArray(post[key])) {
    //       return post[key].some((keyEl) => selectedNodes[key].includes(keyEl));
    //     }
    //     return (
    //       selectedNodes &&
    //       selectedNodes[key] &&
    //       selectedNodes[key].includes(post[key])
    //     );
    //   });
    // });
    // console.log({ filteredPosts });

    // console.log('month --', selectedPosts.month);
    // console.log('company --', selectedPosts.company);
  };

  // const onChange = (currentNode, selectedNodes) => {
  //   let filteredItems =
  //     !!selectedNodes.length &&
  //     selectedNodes.map((node) => {
  //       // console.log(node);
  //       return origPosts.filter((post) => {
  //         if (node.category === 'month') {
  //           return post?.created_on.includes(`-${node.value}-`);
  //         }
  //         for (let [key, value] of Object.entries(post)) {
  //           if (node.category === 'month') {
  //             return post?.created_on.includes(`-${node.value}-`);
  //           }
  //           if (key === node.category && value === node.value) {
  //             return post;
  //           }
  //         }
  //       });
  //     });
  //   filteredItems = !!filteredItems.length && filteredItems.flat(Infinity);
  //   console.log(filteredItems);
  //   // setFiltPosts(filteredItems);
  // };

  return (
    <>
      <div className='Option_Main'>
        <div className='Option_Heading'>Monthly Reportage</div>
        <div className='Option_List'>
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
          <DropdownTreeSelect
            keepTreeOnSearch
            data={optionDropdown}
            onChange={onChange}
            className='mdl-demo'
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
