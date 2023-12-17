import { PieChart, Pie, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Rectangle, AreaChart, Area, Cell } from 'recharts';
import '../style/Statistics.css';

const Statistics = () => {
    const bookCategories = [
        {name: "fiction", value: 525},
        {name: "non-fiction", value: 350},
        {name: "romance", value: 300},
        {name: "adventure", value: 250},
        {name: "thriller", value: 200},
        {name: "mystery", value: 150},
        {name: "horror", value: 100},
        {name: "fantasy", value: 75},
        {name: "science fiction", value: 50},
        {name: "historical fiction", value: 25},
    ];

    const registrations = [
        {
            name: 'Jan',
            users: 4000,
        },
        {
            name: 'Feb',
            users: 3000,
        },
        {
            name: 'Mar',
            users: 2000,
        },
        {
            name: 'Apr',
            users: 2780,
        },
        {
            name: 'May',
            users: 1890,
        },
        {
            name: 'Jun',
            users: 2390,
        },
        {
            name: 'Jul',
            users: 3490,
        },
        {
            name: 'Aug',
            users: 4000,
        },
        {
            name: 'Sep',
            users: 3000,
        },
        {
            name: 'Oct',
            users: 2000,
        },
        {
            name: 'Nov',
            users: 2780,
        },
        {
            name: 'Dec',
            users: 1890,
        },
    ];

    const searchQueries = [
        {name: 'how to code', SearchTimes: 3621},
        {name: 'clean code unkle bob', SearchTimes: 3026},  
        {name: 'the great gatsby', SearchTimes: 2053},  
        {name: 'To Kill A Mockingbird', SearchTimes: 1503},
    ];

    const booksOverYears = [
        {year:"2020", books: 100},
        {year:"2021", books: 186},
        {year:"2022", books: 356},
        {year:"2023", books: 502},
    ];

    const popularBooks = [
        {name: 'The Great Gatsby', 2022: 100, 2023: 201},
        {name: 'To Kill A Mockingbird', 2022: 75, 2023: 150},
        {name: 'The Catcher in the Rye', 2022: 50, 2023: 100},
        {name: 'The Lord of the Rings', 2022: 25, 2023: 50},
    ];

    const events = [
        {year: "2017", eventsNumber: 15},
        {year: "2018", eventsNumber: 75},
        {year: "2019", eventsNumber: 30},
        {year: "2020", eventsNumber: 107},
        {year: "2021", eventsNumber: 130},
        {year: "2022", eventsNumber: 33},
        {year: "2023", eventsNumber: 159},
    ];

    const systemAnalytics = [
        {year: "2017", response: 15},
        {year: "2018", response: 75},
        {year: "2019", response: 30},
        {year: "2020", response: 107},
        {year: "2021", response: 130},
        {year: "2022", response: 33},
        {year: "2023", response: 159},
    ];

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };
      
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <>
            <div className="search" id='search'>
                <div className="container">
                    <h2 className='main-title'>Search Metrics</h2>
                    <h3>Top Search Queries: <span className='text-muted small'>Display the most popular search queries within your library.</span></h3>
                    <BarChart
                    width={500}
                    height={300}
                    data={searchQueries}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="SearchTimes" fill="#A9B388" activeBar={<Rectangle fill="#5F6F52" stroke="#FEFAE0" />} />
                    </BarChart>

                    <h3>Most Searched Categories:</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={bookCategories}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
            
            <div className="user" id='user'>
                <div className="container">
                    <h2 className='main-title'>User Engagement Metrics</h2>

                    <h3>User Registrations: <span className='text-muted small'>Track the number of users registering on your platform over the year.</span></h3>
                    <LineChart
                    width={500}
                    height={300}
                    data={registrations}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="users" stroke="#6B240C" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>

            <div className="bookmetrices" id='bookmetrices'>
                <div className="container">
                    <h2 className='main-title'>Book Metrics</h2>
                    <h3>Total Books: <span className='text-muted small'>Display the total number of books available in the library over the years.</span></h3>
                    <AreaChart
                    width={500}
                    height={400}
                    data={booksOverYears}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="books" stroke="#5FBDFF" fill="#C5FFF8" />
                    </AreaChart>
                    
                    <h3>Popular Books: <span className='text-muted small'>Highlight books with the highest downloads or views over the last 2 years.</span></h3>
                    <BarChart
                        width={500}
                        height={300}
                        data={popularBooks}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="right" dataKey="2022" fill="#9AD0C2" />
                        <Bar yAxisId="left" dataKey="2023" fill="#2D9596" />
                    </BarChart>
                </div>
            </div>

            <div className="libevents" id='libevents'>
                <div className="container">
                    <h2 className="main-title">Library Events and Programs</h2>
                    <h3>Events Stats: <span className='text-muted small'>Display the events indicators over the years.</span></h3>
                    <BarChart
                    width={500}
                    height={300}
                    data={events}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="eventsNumber" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {events.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>

                </div>
            </div>

            <div className="system">
                <div className="container">
                    <h2 className="main-title">System Performance</h2>

                    <h3>System Performance: <span className='text-muted small'>Display the system performance indicators over the years.</span></h3>
                    {systemAnalytics.some(data => data.users > 1000) && (
                        <p>Note: High number of users in certain years may affect performance.</p>
                    )}
                    <LineChart
                    width={500}
                    height={300}
                    data={systemAnalytics}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="response" stroke="#6B240C" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>
        </>
    );
};

export default Statistics;
