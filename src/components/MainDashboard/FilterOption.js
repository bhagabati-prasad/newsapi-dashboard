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
  setFiltreOptions,
}) => {
  const [showDropdown, setShowDropdown] = useState({
    year: false,
    month: false,
    duration: false,
    technology: false,
    company: false,
    partner: false,
  });
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const date = new Date().toLocaleDateString();
  const yyyy = date.split('/')[2];
  const dd = date.split('/')[1];
  const ydd = date.split('/')[1] - 1 + '';
  const mm = date.split('/')[0] - 1 + '-' + yyyy;
  const today = dd + '-' + mm;
  const yesterday = ydd + '-' + mm;

  // console.log({ today, yesterday });

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
    duration: [
      { label: 'Today', value: today },
      { label: 'Yesterday', value: yesterday },
      { label: 'This Month', value: mm },
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

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const chkBoxVal = e.target.value;
    if (isChecked) {
      if (chkBoxVal === 'month') {
        const allMonths = dropdown.months.map((month) => month.value);
        setSelectedMonth(allMonths);
      }
      if (chkBoxVal === 'tech') {
        const allTech = dropdown.technologies.map((tech) => tech.value);
        setSelectedTech(allTech);
      }
      if (chkBoxVal === 'company') {
        const allCompanies = dropdown.companies.map((company) => company.value);
        setSelectedCompany(allCompanies);
      }
      if (chkBoxVal === 'partner') {
        const allPartners = dropdown.partners.map((partner) => partner.value);
        setSelectedPartner(allPartners);
      }
      setSelectedOptions([
        ...selectedMonth,
        ...selectedTech,
        ...selectedCompany,
        ...selectedPartner,
      ]);

      // --- API fetch working ----
      console.log('--handle Select All IF--', [
        ...selectedMonth,
        ...selectedTech,
        ...selectedCompany,
        ...selectedPartner,
      ]);

      axios
        .get(
          `https://newsdashapi.herokuapp.com/Sentiment/${[
            ...selectedMonth,
            ...selectedTech,
            ...selectedCompany,
            ...selectedPartner,
          ]}`
        )
        .then((res) => {
          // console.log(res.data);
          const getRes = res.data;
          // console.log({ getRes });
          const filterMonthCount = [];
          for (let index in getRes.Month) {
            let matchedObj = data.find((i) => i.name === getRes.Month[index]);
            matchedObj['Positive'] = getRes.Positive[index];
            matchedObj['Negative'] = getRes.Negative[index];
            filterMonthCount.push(matchedObj);
            // console.log('--data format', dataFormat);
          }
          setData([...dataFormat, ...filterMonthCount]);
          // console.log('filter month count--', filterMonthCount);
        })
        .catch((err) => console.log(err.response));

      axios
        .get(
          `https://newsdashapi.herokuapp.com/table/${[
            ...selectedMonth,
            ...selectedTech,
            ...selectedCompany,
            ...selectedPartner,
          ]}`
        )
        .then((res) => {
          let getFilteredData = res.data;
          getFilteredData = JSON.parse(getFilteredData);
          console.log({ getFilteredData });
          getFilteredData = getFilteredData.filter(
            (item) =>
              item.year === curYear || item?.created_on.includes(curYear)
          );
          setFiltPosts([...new Set(getFilteredData)]);
        })
        .catch((err) => console.log(err.response));
    } else {
      let filteredSelectedOptions = [];
      if (chkBoxVal === 'month') {
        const filtByMonth = selectedOptions.filter(
          (opt) => !dropdown.months.map((item) => item.value).includes(opt)
        );
        filteredSelectedOptions = filtByMonth;
        setSelectedOptions(filtByMonth);
      }
      if (chkBoxVal === 'tech') {
        const filtByTech = selectedOptions.filter(
          (opt) =>
            !dropdown.technologies.map((item) => item.value).includes(opt)
        );
        filteredSelectedOptions = filtByTech;
        setSelectedOptions(filtByTech);
      }
      if (chkBoxVal === 'company') {
        const filtByCompany = selectedOptions.filter(
          (opt) => !dropdown.companies.map((item) => item.value).includes(opt)
        );
        filteredSelectedOptions = filtByCompany;
        setSelectedOptions(filtByCompany);
      }
      if (chkBoxVal === 'partner') {
        const filtByPartner = selectedOptions.filter(
          (opt) => !dropdown.partners.map((item) => item.value).includes(opt)
        );
        filteredSelectedOptions = filtByPartner;
        setSelectedOptions(filtByPartner);
      }

      console.log({ filteredSelectedOptions });

      axios
        .get(
          `https://newsdashapi.herokuapp.com/Sentiment/${filteredSelectedOptions}`
        )
        .then((res) => {
          // console.log(res.data);
          const getRes = res.data;
          // console.log({ getRes });
          const filterMonthCount = [];
          for (let index in getRes.Month) {
            let matchedObj = data.find((i) => i.name === getRes.Month[index]);
            matchedObj['Positive'] = getRes.Positive[index];
            matchedObj['Negative'] = getRes.Negative[index];
            filterMonthCount.push(matchedObj);
            // console.log('--data format', dataFormat);
          }
          setData([...dataFormat, ...filterMonthCount]);
          // console.log('filter month count--', filterMonthCount);
        })
        .catch((err) => console.log(err.response));

      axios
        .get(
          `https://newsdashapi.herokuapp.com/table/${filteredSelectedOptions}`
        )
        .then((res) => {
          let getFilteredData = res.data;
          getFilteredData = JSON.parse(getFilteredData);
          console.log({ getFilteredData });
          getFilteredData = getFilteredData.filter(
            (item) =>
              item.year === curYear || item?.created_on.includes(curYear)
          );
          setFiltPosts([...new Set(getFilteredData)]);
        })
        .catch((err) => console.log(err.response));
    }
  };

  const handleCheckboxChange = (e) => {
    const currValue = e.target.value;
    if (selectedOptions.includes(currValue)) {
      const filteredArray = selectedOptions.filter(
        (option) => option !== currValue
      );
      // console.log({ filteredArray });
      setSelectedOptions(filteredArray);

      const monthArr = filteredArray.filter((option) =>
        Object.values(dropdown.months)
          .map((item) => item.value)
          .includes(option)
      );
      // http://test.coeaibbsr.in
      // --- API fetch working ----
      console.log('--handleCheckBoxChange IF--');
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
            filterMonthCount.push(matchedObj);
            // console.log('--data format', dataFormat);
          }
          console.log({ filterMonthCount });

          setData([...dataFormat, ...filterMonthCount]);
          // console.log('filter month count--', filterMonthCount);
        })
        .catch((err) => console.log(err));

      axios
        .get(`https://newsdashapi.herokuapp.com/table/${filteredArray}`)
        .then((res) => {
          let getFilteredData = res.data;
          getFilteredData = JSON.parse(getFilteredData);
          // getFilteredData = getFilteredData.filter((item) => {
          //   return item.year == curYear || item?.created_on.includes(curYear);
          // });
          console.log({ getFilteredData });
          setFiltPosts(getFilteredData);
        })
        .catch((err) => console.log(err));
    } else {
      const newSelectedOptions = [...selectedOptions, currValue];
      setSelectedOptions([...selectedOptions, currValue]);

      const monthArr = newSelectedOptions.filter((option) =>
        Object.values(dropdown.months)
          .map((item) => item.value)
          .includes(option)
      );
      // http://test.coeaibbsr.in
      console.log('--handleCheckBoxChange ELSE--');
      axios
        .get(`https://newsdashapi.herokuapp.com/Sentiment/${monthArr}`)
        .then((res) => {
          const getRes = res.data;
          const filterMonthCount = [];
          for (let index in getRes.Month) {
            let matchedObj = data.find((i) => i.name === getRes.Month[index]);
            matchedObj['Positive'] = getRes.Positive[index];
            matchedObj['Negative'] = getRes.Negative[index];
            filterMonthCount.push(matchedObj);
            // console.log('--data format', dataFormat);
          }
          setData([...dataFormat, ...filterMonthCount]);
          // console.log('filter month count--', filterMonthCount);
        })
        .catch((err) => console.log(err));

      axios
        .get(`https://newsdashapi.herokuapp.com/table/${newSelectedOptions}`)
        .then((res) => {
          let getFilteredData = res.data;
          getFilteredData = JSON.parse(getFilteredData);
          // getFilteredData = getFilteredData.filter(
          //   (item) => item.year == curYear || item?.created_on.includes(curYear)
          // );
          console.log({ getFilteredData });
          setFiltPosts(getFilteredData);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDurationChange = (e) => {
    if (e.target.value) {
      const filteredByDuration = filtPosts.filter(
        // (post) => post?.date.split('/')?.[1] === e.target.value
        (post) => {
          if (post?.created_on) {
            return post?.created_on.includes(e.target.value);
          }
          if (post?.date) {
            return post?.date.split('/')?.[1] === e.target.value;
          }
        }
      );
      console.log({ filteredByDuration });
      setFiltPosts(filteredByDuration);
    } else {
      setFiltPosts(origPosts);
    }
  };

  // axios
  //   .get('http://test.coeaibbsr.in/table/November,April,Wipro')
  //   .then((res) => {
  //     let getFilteredData = res.data;
  //     getFilteredData = JSON.parse(getFilteredData);
  //     console.log({ getFilteredData });
  //   });

  // const handleSubmit = () => {
  //   setFiltreOptions(selectedOptions);
  //   const monthArr = selectedOptions.filter((option) =>
  //     Object.values(dropdown.months)
  //       .map((item) => item.value)
  //       .includes(option)
  //   );
  //   // http://test.coeaibbsr.in
  //   axios
  //     .get(`https://newsdashapi.herokuapp.com/Sentiment/${monthArr}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       const getRes = res.data;
  //       // console.log({ getRes });
  //       const filterMonthCount = [];
  //       for (let index in getRes.Month) {
  //         let matchedObj = data.find((i) => i.name === getRes.Month[index]);
  //         matchedObj['Positive'] = getRes.Positive[index];
  //         matchedObj['Negative'] = getRes.Negative[index];
  //         filterMonthCount.push(matchedObj);
  //         // console.log('--data format', dataFormat);
  //       }
  //       setData([...dataFormat, ...filterMonthCount]);
  //       // console.log('filter month count--', filterMonthCount);
  //     })
  //     .catch((err) => console.log(err.response));

  //   axios
  //     .get(`https://newsdashapi.herokuapp.com/table/${selectedOptions}`)
  //     .then((res) => {
  //       let getFilteredData = res.data;
  //       getFilteredData = JSON.parse(getFilteredData);
  //       console.log({ getFilteredData });
  //       getFilteredData = getFilteredData.filter(
  //         (item) => item.year === curYear || item?.created_on.includes(curYear)
  //       );
  //       setFiltPosts([...new Set(getFilteredData)]);
  //     })
  //     .catch((err) => console.log(err.response));

  //   setShowDropdown({
  //     month: false,
  //     technology: false,
  //     company: false,
  //     partner: false,
  //   });
  // };

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
              <label htmlFor='select all'>
                <input
                  type='checkbox'
                  value='month'
                  onChange={handleSelectAll}
                  id='select all'
                />
                &nbsp; Select All
              </label>
              {dropdown.months.map((month, indx) => (
                <label htmlFor={month.value} key={indx}>
                  <input
                    type='checkbox'
                    value={month.value}
                    onChange={handleCheckboxChange}
                    id={month.value}
                    checked={selectedOptions.includes(month.value)}
                  />
                  &nbsp;
                  {month.label}
                </label>
              ))}
            </div>
          </div>
          <select
            name='year'
            onChange={handleDurationChange}
            className='singleInputBox'
          >
            <option value=''>Duration</option>
            {dropdown.duration.map((duration) => (
              <option value={duration.value} key={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
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
              <label htmlFor='all_tech'>
                <input
                  type='checkbox'
                  value='tech'
                  onChange={handleSelectAll}
                  id='all_tech'
                />
                &nbsp; Select All
              </label>
              {dropdown.technologies.map((tech, indx) => (
                <label htmlFor={tech.value} key={indx}>
                  <input
                    type='checkbox'
                    value={tech.value}
                    onChange={handleCheckboxChange}
                    id={tech.value}
                    checked={selectedOptions.includes(tech.value)}
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
              <label htmlFor='allcompany'>
                <input
                  type='checkbox'
                  value='company'
                  onChange={handleSelectAll}
                  id='allcompany'
                />
                &nbsp; Select All
              </label>
              {dropdown.companies.map((company, indx) => (
                <label htmlFor={company.value} key={indx}>
                  <input
                    type='checkbox'
                    value={company.value}
                    onChange={handleCheckboxChange}
                    id={company.value}
                    checked={selectedOptions.includes(company.value)}
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
              <label htmlFor='all_partner'>
                <input
                  type='checkbox'
                  value='partner'
                  onChange={handleSelectAll}
                  id='all_partner'
                />
                &nbsp; Select All
              </label>
              {dropdown.partners.map((partner, indx) => (
                <label htmlFor={partner.value} key={indx}>
                  <input
                    type='checkbox'
                    value={partner.value}
                    onChange={handleCheckboxChange}
                    id={partner.value}
                    checked={selectedOptions.includes(partner.value)}
                  />
                  &nbsp;
                  {partner.label}
                </label>
              ))}
            </div>
          </div>
          {/* <button onClick={handleSubmit} className='singleInputBox'>
            Filter
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
