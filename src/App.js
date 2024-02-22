import './App.css';

function App() {

  let isLoading = false;
  const title = 'Leave your comment';
  const movieComments = [
    {
      id: 1,
      author: 'Marko Markovic',
      content: 'This is the best movie I have ever seen'
    },
    {
      id: 2,
      author: 'Petar Petrovic',
      content: 'I didnt like this movie at all'
    },
    {
      id: 3,
      author: 'Sara Saric',
      content: 'Movie is okay.'
    }
  ];

  const movieCommentsBlock = (
    <div className='comments'>
      <h3> Movie has {movieComments.length} comments. </h3>
      <ul>
        {
          movieComments.map((comment, idx) => {
            return <li key={comment.id}>
              {comment.author} says: <br/>
              {comment.content}
            </li>
          })
        }
      </ul>
    </div>
  );

  const players = [
    {
      id: 100,
      name: 'Lionel Messi',
      club: 'Inter Miami',
      jersey: 10,
      isActive: true,
      goalsScored: 43
    },
    {
      id: 101,
      name: 'Luis Suarez',
      club: 'Inter Miami',
      jersey: 9,
      isActive: true,
      goalsScored: 48
    },
    {
      id: 200,
      name: 'Dusan Vlahovic',
      club: 'Juventus',
      jersey: 9,
      isActive: true,
      goalsScored: 34
    },
    {
      id: 201,
      name: 'Lautaro Martinez',
      club: 'Inter Milan',
      jersey: 10,
      isActive: true,
      goalsScored: 41
    },
    {
      id: 300,
      name: 'Ben Chillwel',
      club: 'Chelsea',
      jersey: 21,
      isActive: true,
      goalsScored: 7
    },
    {
      id: 301,
      name: 'Didier Drogba',
      club: 'Chelsea',
      jersey: 9,
      isActive: false,
      goalsScored: 230
    }
  ];

  const totalGoals = players.reduce((acc, player) => acc + player.goalsScored, 0);

  return (
    // <>  </>  - je otvoreno - zatvoreni fragment
    // Za davanje klasa HTML elementima MORAMO koristiti className atribut (umesto class kako smo ranije radili)
    <> 
      <h1 className='main-title'>
        {title}
      </h1>
      <p>
        {Math.floor(Math.random() * 100)}
      </p>
      <p>{isLoading ? 'Still loading...' : 'Loading finished!'}</p>
      {/* 1. slucaj jeste ako ispisujemo jedan ili drugi sadrzaj u odnosu na logicki uslov postavljen (isLoading u ovom slucaju) */}
      {/* {
        isLoading ? (
          <p>Still loading movie comments...</p>
        ) : (
          <div className='comments'>
            <h3> Movie has {movieComments.length} comments. </h3>
            <ul>
              {
                movieComments.map((comment, idx) => {
                  return <li key={comment.id}>
                    {comment.author} says: <br/>
                    {comment.content}
                  </li>
                })
              }
            </ul>
          </div>
        )
      } */}

      {/* 2. slucaj jeste da ako je logicki uslov zadovljen prikazujemo konkretan blok HTML koda koji hocemo da vidimo, u suprotnom ne prikazujemo nista */}
      {/* {
        !isLoading && movieCommentsBlock
      } */}

      {/* Domaci */}
      {
        players.length > 0 &&
          players.map(p => {
            return <p>{p.name}, jersey: {p.jersey}, club: {p.club} ({p.isActive ? 'active' : 'inactive'})</p>
          })
      }
      <p>
        Total goals of all players = {totalGoals}
      </p>
    </>
  );
}

export default App;
