import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

const Chart = () => {
  // Sample data
  const data = [
    { name: 'JAN', students: 40, students2: 70 },
    { name: 'FEB', students: 70 },
    { name: 'MARCH', students: 20 },
    { name: 'APRIL', students: 100 },
    { name: 'JAN', students: 40 },
    { name: 'FEB', students: 70 },
    { name: 'MARCH', students: 20 },
    { name: 'APRIL', students: 100 },
    { name: 'JAN', students: 40 },
    { name: 'FEB', students: 70 },
    { name: 'MARCH', students: 20 },
    { name: 'APRIL', students: 100 },
  ];

  return (
    <div style={{ marginLeft: '5%', marginTop: '50px' }}>
      <BarChart width={1000} height={300} data={data}>
        <Bar dataKey='students' fill='green' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis />
      </BarChart>
    </div>
  );
};

export default Chart;
