function main()  {
  let score = loadScore()
  new ScorePlayer().playScore({score})
}

class ScorePlayer {
  constructor(kwargs) {
    this.synth = this.genSynth()
  }

  genSynth() {
    let synth = new Tone.PolySynth(8).toMaster()
    return synth
  }

  playScore(kwargs) {
    let score = kwargs.score || {}
    let bpm = score.bpm || 140
    for (let track of score.tracks) {
      var renderedTrack = new Tone.Part((time, note) => {
        this.synth.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity
        )
      }, track.notes).start()
    }
    Tone.Transport.start()
  }
}


function loadScore() {
  let score = genScore()
  return score
}

function genScore(kwargs) {
  kwargs = kwargs || {}
  numNotes = kwargs.numNotes || 3
  let score = {
    header: {
      bpm: 120,
    },
    tracks: [
      {
        startTime: 0,
        duration: 127.28854166666662,
        length: 147,
        id: 1,
        name: "Bass",
        instrumentNumber: 33,
        instrument: "electric bass (finger)",
        instrumentFamily: "bass",
        channelNumber: 0,
        isPercussion: false,
        notes: genNotes({numNotes}),
      }
    ]
  }
  return score
}

function genNotes(kwargs) {
  kwargs = kwargs || {}
  let curTime = kwargs.startTime || 0
  let numNotes = kwargs.numNotes || 3
  let noteDuration = kwargs.noteDuration || 0.25
  notes = []
  for (let i = 0; i < numNotes; i++) {
    note = genNote({
      time: curTime,
      duration: noteDuration
    })
    notes.push(note)
    curTime += noteDuration
  }
  return notes
}

function genNote(kwargs) {
  let {time, duration} = kwargs
  let note = {
    "name": genRandomNoteName(),
    "midi": null,
    "time": 0,
    "velocity": 0.6141732283464567,
    "duration": duration,
  }
  return note
}

function genRandomNoteName() {
  let LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  let octave = 4
  let noteLetter = LETTERS[randomInt({max: LETTERS.length})]
  let noteName = [noteLetter, octave].join('')
  return noteName
}

function randomInt(kwargs) {
  let max = kwargs.max
  let min = kwargs.min || 0
  return Math.floor(Math.random() * (max - min)) + min;
}

main()