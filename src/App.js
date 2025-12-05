import './App.css';
import arrow from './assets/arrowicon.png';
import restart from './assets/reseticon.png';
import coatingbucket from './assets/coatingbucket.png';
import sceneicon from './assets/sunicon.png';
import editicon from './assets/editicon.png';
import infoicon from './assets/infoicon.png';
import foldericon from './assets/foldericon.png';
import camera from './assets/camera.png';
import lens from './assets/lenscut.png';
import title from './assets/title.png';
import subtitle from './assets/subtitle.png';
import jar1 from './assets/jar1.png';
import jar2 from './assets/jar2.png';
import jar3 from './assets/jar3.png';
import jar4 from './assets/jar4.png';
import jar5 from './assets/jar5.png';
import photo1 from './photos/1.JPG';
import photo2 from './photos/2.JPG';
import photo3 from './photos/3.JPG';
import photo4 from './photos/4.JPG';
import photo5 from './photos/5.JPG';
import photo6 from './photos/6.JPG';
import photo7 from './photos/7.JPG';
import photo8 from './photos/8.JPG';
import photo9 from './photos/9.JPG';
import photo10 from './photos/10.JPG';
import photo11 from './photos/11.JPG';
import photo12 from './photos/12.JPG';
import { useState } from 'react';

function App() {
  let [coatings, setCoatings] = useState(
                  [[{color: '#fbbbad50', colorDark: '#cc9b9050', jar: jar5, name: 'anti reflective', isSelected: true},
                    {color: '#ee869550', colorDark: '#c57e8850', jar: jar1, name: 'scratch resistant', isSelected: false}
                  ],
                  [ {color: '#333f5850', colorDark: '#2d344350', jar: jar3, name: 'uv protective', isSelected: false}, 
                    {color: '#29283150', colorDark: '#00000050', jar: jar4, name: 'water-oil repellent', isSelected: false}
                  ],
                  [ {color: '#ee869550', colorDark: '#c57e8850', jar: jar1, name: 'mirror', isSelected: false}, 
                    {color: '#4a7a9650', colorDark: '#3b586a50', jar: jar2, name: 'photochromic', isSelected: false}
                  ],
                  [ {color: '#333f5850', colorDark: '#2d344350', jar: jar3, name: 'polarized', isSelected: false}, 
                    {color: '#fbbbad50', colorDark: '#cc9b9050', jar: jar5, name: 'subwavelength', isSelected: false}
                  ],
                  [ {color: '#4a7a9650', colorDark: '#3b586a50', jar: jar2, name: 'color correcting warm', isSelected: false}, 
                    {color: '#ee869550', colorDark: '#c57e8850', jar: jar1, name: 'color correcting cool', isSelected: false}
                  ]]);
  let images = [{src: photo1, alt: "Chicago River"}, 
                {src: photo2, alt: "Colorado Springs Pikes Peak"}, 
                {src: photo3, alt: "Mines Home Football Game Touchdown"},
                {src: photo4, alt: "View from Elm Hall 5th Floor"}, 
                {src: photo5, alt: "Estes Park YMCA Benches"},
                {src: photo6, alt: "Estes Park YMCA Rope Course"},
                {src: photo7, alt: "Estes Park Sunrise"},
                {src: photo8, alt: "The Bean in Chicago"},
                {src: photo9, alt: "Chicago Street"},
                {src: photo10, alt: "Cathedral in Chicago"},
                {src: photo11, alt: "Lights in Chicago"},
                {src: photo12, alt: "Road with Lights lining it on the trees"},]
  let [selectedImage, setSelectedImage] = useState(0);
  let [archive, setArchive] = useState([])
  let [coatingRow, setCoatingRow] = useState(0);
  let [coatingCol, setCoatingCol] = useState(0);
  let [lensPosition, setLensPosition] = useState('10px')
  let [lensZ, setLensZ] = useState(0)
  let [page, setPage] = useState(2)
  let [scenesPopup, showScenes] = useState(false);
  let [folderPopup, showArchive] = useState(false);
  let [overlaySave, setOverlaySave] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  // need to do polarized
  let overlayNames = ['anti reflective', 'scratch resistant', 'uv protective', 'water-oil repellent', 'mirror', 'photochromic', 'polarized', 'subwavelength', 'color correcting warm', 'color correcting cool']

  const setSelection = (row, col, selected) => {
    if (!(row == coatingRow && col == coatingCol)) {
      let copy = [...coatings];
      copy[row][col].isSelected = selected;

      copy[coatingRow][coatingCol].isSelected = false;

      setCoatingCol(col);
      setCoatingRow(row);

      setCoatings(copy);
    }
  }

  const moveLens = () => {
    let overlaysCopy = [...overlaySave];
    overlaysCopy[2*coatingRow+coatingCol] = 1;
    setOverlaySave(overlaysCopy)
    setLensZ(-1);
    setLensPosition('400px');
    setTimeout(() => {
      setLensPosition('10px');
      setTimeout(() => {
        setLensZ(0);
      }, 2000);
    }, 2000);
  }

  const capture = () => {
    let archiveCopy = [...archive]
    archiveCopy.push({
      src: images[selectedImage].src, 
      alt: images[selectedImage].alt, 
      blur: 10, 
      overlays: overlaySave
    })
    setArchive(archiveCopy)
  }

  const resetCoatings = () => {
    setOverlaySave([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  return (
    <div className="App">
    <>
    {
      page == 0 ? (
        <>
          <div style={{height: window.innerHeight}}>
            <img src={subtitle} width={window.innerWidth/5} style={{marginTop: -window.innerHeight/20, marginBottom: -window.innerHeight/20}}/>
            <div className="palette" style={{width: window.innerWidth/4, marginLeft: window.innerWidth/100, paddingTop: window.innerHeight/55}}>
              { coatings.map((val, i) => (
                <div className="row">
                  { val.map((v, j) => (
                      <div className="circle" style={{marginRight: j == 0 ? window.innerWidth/25 : '0px', borderStyle: 'solid', borderWidth: '5px', borderColor: v.isSelected ? '#000' : v.colorDark, backgroundColor: v.color}}
                            onClick={() => setSelection(i, j, !v.isSelected)}/>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{position: 'absolute', right: '10px', top: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img src={restart} alt="Restart" height={window.innerWidth/12} width={window.innerWidth/12} onClick={() => resetCoatings()}/>
              <img src={arrow} alt="Move on" height={window.innerWidth/12} width={window.innerWidth/12} onClick={() => setPage(1)}/>
            </div>
          </div>
          <div style={{marginTop: window.innerHeight/4, marginLeft: window.innerWidth/2-window.innerWidth/3}}>
            <img src={coatings[coatingRow][coatingCol].jar} alt="Coating Dip Jar" height={window.innerWidth/3} width={window.innerWidth/3}/>
            <p style={{marginTop: -window.innerHeight/20, fontSize: window.innerHeight/25}}>{coatings[coatingRow][coatingCol].name}</p>
          </div>
          <img onClick={() => moveLens()} style={{position: 'absolute', left: window.innerWidth/2+window.innerWidth/85, top: lensPosition, zIndex: lensZ}} className="lens" src={lens} alt="Lens" height={window.innerWidth/6} width={window.innerWidth/6}/>
          <div style={{position: 'absolute', bottom: window.innerHeight/100, right: window.innerWidth/100, textAlign: 'right'}}>
            {
              overlaySave.map((val, i) => (
                <>
                {
                  val == 1 ? (
                    <p>{overlayNames[i]}</p>
                  ) : null
                }
                </>
              ))
            }
          </div>
        </>
      ) : page == 1 ? (
        <>
          <div>
            <img src={camera} alt="Digital Camera" height={window.innerWidth/3} width={window.innerWidth/3} style={{position: 'absolute', left: window.innerWidth/2-window.innerWidth/6, top: window.innerHeight/10}} onClick={() => capture()}/>
            <p style={{position: 'absolute', left: window.innerWidth/2-window.innerWidth/15, top: window.innerHeight/1.5}}>click on digital camera to capture</p>
            <div style={{position: 'absolute', left: window.innerWidth/2-window.innerWidth/6 + window.innerWidth/50, top: window.innerHeight/5 + (window.innerHeight/3-window.innerHeight/5.65)/2.27}}>
              <img src={images[selectedImage].src} alt={images[selectedImage].alt} height={window.innerWidth/5.65} width={window.innerWidth/4.31} 
                style={{borderRadius: '7px', 
                        filter: (overlaySave[0] == 1 ? '' : 'brightness(75%)') + (overlaySave[1] == 1 ? '' : 'sepia(50%)') + (overlaySave[3] == 1 && overlaySave[4] == 1 ? '' : overlaySave[3] == 1 || overlaySave[4] == 1 ? 'blur(2px)' : 'blur(4px)') + (overlaySave[5] == 1 && overlaySave[2] == 1 ? 'saturate(100%)' : ((overlaySave[5] == 1 || overlaySave[2] == 1) ? 'saturate(75%)' : 'saturate(50%)')) + (overlaySave[7] == 1 && overlaySave[6] == 1 ? '' : overlaySave[7] == 1 || overlaySave[6] == 1 ? 'contrast(25%)' : 'contrast(50%)') + (overlaySave[8] == 1 && overlaySave[9] != 1 ? 'hue-rotate(-25deg)' : (overlaySave[8] == 1 && overlaySave[9] == 1 ? '' : 'hue-rotate(25deg)'))}}/>
            </div>
          </div>
          <div style={{justifyContent: 'space-between', display: 'flex', flexDirection: 'row', width: window.innerWidth - 2 * window.innerWidth/75, position: 'absolute', bottom: window.innerHeight/100, paddingRight: window.innerWidth/75, paddingLeft: window.innerWidth/75}}>
            <div>
              <img src={sceneicon} alt="Scene" height={window.innerWidth/12} width={window.innerWidth/12} onClick={() => showScenes(!scenesPopup)}/>
              <img src={editicon} alt="Edit" height={window.innerWidth/12} width={window.innerWidth/12} onClick={() => setPage(0)}/>
            </div>
            <div>
              <img src={infoicon} alt="Info" height={window.innerWidth/12} width={window.innerWidth/12}/>
              <img src={foldericon} alt="Saved Files" height={window.innerWidth/12} width={window.innerWidth/12} onClick={() => showArchive(!folderPopup)}/>
            </div>
          </div>
          <>
            {
              scenesPopup ? (
                <div className="scrollBg" style={{height: window.innerHeight/1.27, width: window.innerWidth/10, marginTop: window.innerHeight/100, marginLeft: window.innerWidth/100, paddingTop: window.innerHeight/100, paddingBottom: window.innerHeight/100}}>
                  <div style={{overflowY: 'scroll', height: window.innerHeight/1.27}}>
                  {
                    images.map((val, i) => (
                      <div>
                        <img src={val.src} alt={val.alt} width={window.innerWidth/12} onClick={() => setSelectedImage(i)}/>
                      </div>
                    ))
                  }
                  </div>
                </div>
              ) : null
            }
          </>
          <>
            {
              folderPopup ? (
                <div className="scrollBg" style={{height: window.innerHeight/1.27, width: window.innerWidth/10, top: window.innerHeight/100, right: window.innerWidth/100, position: 'absolute',  paddingTop: window.innerHeight/100, paddingBottom: window.innerHeight/100}}>
                  <div style={{overflowY: 'scroll', height: window.innerHeight/1.27}}>
                  {
                    archive.map((val, i) => (
                      <div style={{}}>
                        <img src={val.src} alt={val.alt} width={window.innerWidth/12} style={{filter: (val.overlays[0] == 1 ? '' : 'brightness(75%)') + (val.overlays[1] == 1 ? '' : 'sepia(50%)') + (val.overlays[3] == 1 && val.overlays[4] == 1 ? '' : val.overlays[3] == 1 || val.overlays[4] == 1 ? 'blur(2px)' : 'blur(4px)') + (val.overlays[5] == 1 && val.overlays[2] == 1 ? 'saturate(100%)' : ((val.overlays[5] == 1 || val.overlays[2] == 1) ? 'saturate(75%)' : 'saturate(50%)')) + (val.overlays[7] == 1 && val.overlays[6] == 1 ? '' : val.overlays[7] == 1 || val.overlays[6] == 1 ? 'contrast(25%)' : 'contrast(50%)') + (val.overlays[8] == 1 && val.overlays[9] != 1 ? 'hue-rotate(-25deg)' : (val.overlays[8] == 1 && val.overlays[9] == 1 ? '' : 'hue-rotate(25deg)'))}}/>

                      </div>
                    ))
                  }
                  </div>
                </div>
              ) : null
            }
          </>
        </>
      ) : (
        <div className="titleBg" style={{width: window.innerWidth, height: window.innerHeight}} onClick={() => setPage(0)}>
          <img src={title} alt={"Camera Lens Crafter"} />
          <p style={{justifyContent: 'center', marginTop: -window.innerHeight/15}}>click anywhere to start</p>
        </div>
      )
    }
    </>
    </div>
  );
}

export default App;
