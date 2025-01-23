import { Diary, newDiary } from './types.ts'
import { useState, useEffect } from 'react'
import { createDiary, getAllDiaries } from './diaryService.ts'

function App() {
  const [newDiary, setNewDiary] = useState<newDiary>({
    date: '',
    weather: 'sunny',
    visibility: 'good',
    comment: ''
  })
  const [diaries, setDiaries] = useState<Diary[]>([])
  useEffect(() => {
    getAllDiaries().then(diaries => setDiaries(diaries))
  }, [])
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary(newDiary).then((data: Diary) => setDiaries(diaries.concat(data)))
    setNewDiary({
      date: '',
      weather: 'sunny',
      visibility: 'good',
      comment: ''
    });
  }
  return (
    <>
      <h2>Diary Creation</h2>
      <form onSubmit={diaryCreation}>
        <div>
          Date:
          <input value={newDiary.date} type={'date'}
                 onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
        </div>

        <div>
          Weather:
          Sunny:
          <input type={'radio'} name={'weather'} 
                    onChange={() => setNewDiary({ ...newDiary, weather: 'sunny'})} />
          Rainy:
          <input type={'radio'} name={'weather'} 
                  onChange={() => setNewDiary({ ...newDiary, weather: 'rainy' })} />
          Windy:
          <input type={'radio'} name={'weather'} 
                  onChange={() => setNewDiary({ ...newDiary, weather:'windy' })} />
          Cloudy:
          <input type={'radio'} name={'weather'} 
                  onChange={() => setNewDiary({ ...newDiary, weather: 'cloudy'})} />
          Stormy:
          <input type={'radio'} name={'weather'} 
                  onChange={() => setNewDiary({ ...newDiary, weather:'stormy'})} />
        </div>
        <div>
          Visibility:
          Great:
          <input type={'radio'}  name={'visibility'}
                 onChange={() => setNewDiary({ ...newDiary, visibility:'great'})} />
          Good:
          <input type={'radio'}  name={'visibility'}
                 onChange={() => setNewDiary({ ...newDiary, visibility: 'good' })} />
          OK:
          <input type={'radio'}  name={'visibility'}
                 onChange={() => setNewDiary({ ...newDiary, visibility: 'ok' })} />
          Poor:
          <input type={'radio'}  name={'visibility'}
                 onChange={() => setNewDiary({ ...newDiary, visibility: 'poor' })} />
        </div>
        <div>
          Comment:
          <input value={newDiary.comment}
                 onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })} />
        </div>
        <button type={'submit'}>Create new Diary</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <p><b>{diary.date}</b></p>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))
      }
    </>
  )
}

export default App
