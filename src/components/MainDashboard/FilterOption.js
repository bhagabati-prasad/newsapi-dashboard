import axios from 'axios';
import { useState } from 'react';
import '../styles/FilterOption.css';

const FilterOption = ({
  dataFormat,
  data,
  setData,
  origPosts,
  filtPosts,
  setFiltPosts,
}) => {
  const [showDropdown, setShowDropdown] = useState({
    year: false,
    month: false,
    technology: false,
    company: false,
    partner: false,
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdown, setDropdown] = useState({
    years: [2022, 2021, 2020, 2019],
    months: [
      { label: 'Jan', value: 'January' },
      { label: 'Feb', value: 'February' },
      { label: 'Mar', value: 'March' },
      { label: 'Apr', value: 'April' },
      { label: 'May', value: 'May' },
      { label: 'Jun', value: 'June' },
      { label: 'Jul', value: 'July' },
      { label: 'Aug', value: 'August' },
      { label: 'Sep', value: 'September' },
      { label: 'Oct', value: 'October' },
      { label: 'Nov', value: 'November' },
      { label: 'Dec', value: 'December' },
    ],
    technologies: [
      { label: 'Blockchain', value: 'Blockchain' },
      { label: 'AI', value: 'AI' },
    ],
    companies: [
      { label: 'Tech Mahindra', value: 'Tech Mahindra' },
      { label: 'Infosys', value: 'Infosys' },
      { label: 'Accenture', value: 'Accenture' },
      { label: 'Wipro', value: 'Wipro' },
      { label: 'TCS', value: 'TCS' },
      { label: 'Infy', value: 'Infy' },
    ],
    partners: [
      { label: 'AWS', value: 'AWS' },
      { label: 'Google', value: 'Google' },
      { label: 'IBM', value: 'IBM' },
      { label: 'Microsoft', value: 'Microsoft' },
    ],
  });

  const [curYear, setCurYear] = useState(new Date().getFullYear());
  // const [month, setMonth] = useState('01');

  const handleYearChange = (e) => {
    if (!!e.target.value) {
      setCurYear(e.target.value);
      // const postsByYear = filtPosts.filter((post) =>
      //   post.created_on.includes(`${e.target.value}-`) || post.year == e.target.value
      // );
      // // console.log(postsByYear);
      // setFiltPosts(postsByYear);
    }
  };

  // const handleChangeMonth = (e) => {
  //   if (!!e.target.value) {
  //     setMonth(`-${e.target.value}-`);
  //     const postsByMonth = origPosts.filter((post) =>
  //       post.created_on.includes(`${year}-${e.target.value}-`)
  //     );
  //     console.log({ postsByMonth });
  //     setFiltPosts(postsByMonth);
  //   } else {
  //     setFiltPosts(origPosts);
  //   }
  // };

  const handleCheckboxChange = (e) => {
    const currValue = e.target.value;
    if (selectedOptions.includes(currValue)) {
      const filteredArray = selectedOptions.filter(
        (option) => option !== currValue
      );
      // console.log({ filteredArray });
      setSelectedOptions(filteredArray);
    } else {
      setSelectedOptions([...selectedOptions, currValue]);
    }
  };

  // axios
  //   .get('http://test.coeaibbsr.in/table/November,April,Wipro')
  //   .then((res) => {
  //     let getFilteredData = res.data;
  //     getFilteredData = JSON.parse(getFilteredData);
  //     console.log({ getFilteredData });
  //   });

  const handleSubmit = () => {
    const monthArr = selectedOptions.filter((option) =>
      Object.values(dropdown.months)
        .map((item) => item.value)
        .includes(option)
    );
    // http://test.coeaibbsr.in
    axios
      .get(`https://newsdashapi.herokuapp.com/Sentiment/${monthArr}`)
      .then((res) => {
        // console.log(res.data);
        const getRes = res.data;
        // console.log({ getRes });
        const filterMonthCount = [];
        for (let index in getRes.Month) {
          let matchedObj = data.find((i) => i.name === getRes.Month[index]);
          matchedObj['Positive'] = getRes.Positive[index];
          matchedObj['Negative'] = getRes.Negative[index];
          console.log('match obj-- ', matchedObj);
          filterMonthCount.push(matchedObj);
          // console.log('--data format', dataFormat);
        }
        setData([...dataFormat, ...filterMonthCount]);
        // console.log('filter month count--', filterMonthCount);
      })
      .catch((err) => console.log(err.response));

    axios
      .get(`https://newsdashapi.herokuapp.com/table/${selectedOptions}`)
      .then((res) => {
        let getFilteredData = res.data;
        getFilteredData = JSON.parse(getFilteredData);
        console.log({ getFilteredData });
        getFilteredData = getFilteredData.filter(
          (item) => item.year === curYear || item?.created_on.includes(curYear)
        );
        setFiltPosts([...new Set(getFilteredData)]);
      })
      .catch((err) => console.log(err.response));

    setShowDropdown({
      month: false,
      technology: false,
      company: false,
      partner: false,
    });
  };

  return (
    <div className='main_content'>
      <div className='content_section'>
        <h2 className='option_heading'>Monthly Reportage</h2>
        <div className='option_section d-flex justify-content-start'>
          <select
            name='year'
            onChange={handleYearChange}
            className='singleInputBox'
          >
            <option value=''>Year</option>
            {dropdown.years.map((year) => (
              <option value={year} key={year} selected={year === curYear}>
                {year}
              </option>
            ))}
          </select>
          <div
            className='singleInputBox'
            onClick={() =>
              setShowDropdown({ ...showDropdown, month: !showDropdown.month })
            }
          >
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <label>Month</label>
              {showDropdown.month ? (
                <i className='fas fa-chevron-up'></i>
              ) : (
                <i className='fas fa-chevron-down'></i>
              )}
            </div>
            <div
              className='dropdown_chkbox'
              id={showDropdown.month && 'active'}
            >
              {dropdown.months.map((month, indx) => (
                <label htmlFor={month.value} key={indx}>
                  <input
                    type='checkbox'
                    value={month.value}
                    onChange={handleCheckboxChange}
                    id={month.value}
                  />
                  &nbsp;
                  {month.label}
                </label>
              ))}
            </div>
          </div>
          <div
            className='singleInputBox'
            onClick={() =>
              setShowDropdown({
                ...showDropdown,
                technology: !showDropdown.technology,
              })
            }
          >
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <label>Technology</label>
              {showDropdown.technology ? (
                <i className='fas fa-chevron-up'></i>
              ) : (
                <i className='fas fa-chevron-down'></i>
              )}
            </div>
            <div
              className='dropdown_chkbox'
              id={showDropdown.technology && 'active'}
            >
              {dropdown.technologies.map((tech, indx) => (
                <label htmlFor={tech.value} key={indx}>
                  <input
                    type='checkbox'
                    value={tech.value}
                    onChange={handleCheckboxChange}
                    id={tech.value}
                  />
                  &nbsp;
                  {tech.label}
                </label>
              ))}
            </div>
          </div>
          <div
            className='singleInputBox'
            onClick={() =>
              setShowDropdown({
                ...showDropdown,
                company: !showDropdown.company,
              })
            }
          >
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <label>Company</label>
              {showDropdown.company ? (
                <i className='fas fa-chevron-up'></i>
              ) : (
                <i className='fas fa-chevron-down'></i>
              )}
            </div>
            <div
              className='dropdown_chkbox'
              id={showDropdown.company && 'active'}
            >
              {dropdown.companies.map((company, indx) => (
                <label htmlFor={company.value} key={indx}>
                  <input
                    type='checkbox'
                    value={company.value}
                    onChange={handleCheckboxChange}
                    id={company.value}
                  />
                  &nbsp;
                  {company.label}
                </label>
              ))}
            </div>
          </div>
          <div
            className='singleInputBox'
            onClick={() =>
              setShowDropdown({
                ...showDropdown,
                partner: !showDropdown.partner,
              })
            }
          >
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <label>Partner</label>
              {showDropdown.partner ? (
                <i className='fas fa-chevron-up'></i>
              ) : (
                <i className='fas fa-chevron-down'></i>
              )}
            </div>
            <div
              className='dropdown_chkbox'
              id={showDropdown.partner && 'active'}
            >
              {dropdown.partners.map((partner, indx) => (
                <label htmlFor={partner.value} key={indx}>
                  <input
                    type='checkbox'
                    value={partner.value}
                    onChange={handleCheckboxChange}
                    id={partner.value}
                  />
                  &nbsp;
                  {partner.label}
                </label>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit} className='singleInputBox'>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
