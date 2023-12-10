import React, { useState } from 'react'

import { CiGrid42 } from "react-icons/ci";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

import { TbPlayerPlay } from "react-icons/tb";
import { TbPlayerPause } from "react-icons/tb";
import { TbPlayerSkipBack } from "react-icons/tb";
import { TbPlayerSkipForward } from "react-icons/tb";

import { GrFormUpload } from "react-icons/gr";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Modal from './Modal';

import songs from '../assets/songs.json'
import SongList from './SongList';

function Playlist() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');

  const [currentName, setCurrentName] = useState("Love the way you lie")
  const [currentCover, setCurrentCover] = useState('https://upload.wikimedia.org/wikipedia/en/e/ed/Love_the_Way_You_Lie_cover.png')
  const [currentURL, setCurrentURL] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" )

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
    }    
    let list = songs.songs_list
  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-2'>
            <div className="min-h-screen relative flex flex-row border w-full">
            <div className="flex flex-col bg-white rounded-r-3xl overflow-hidden w-full">
                <div className="flex items-center justify-center h-20">
                <h1 className="text-3xl uppercase font-bold text-primary">Logo</h1>
                </div>
                <ul className="flex flex-col py-4">
                <li>
                    <a href="#" className="bg-[#E6F7FF] flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 border-r-4 border-[#1890FF]">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                    <span className="text-sm font-medium text-[#1890FF]"><CiGrid42 className='inline mr-2 text-2xl text-black'/>Songs</span>
                    </a>
                </li>
                </ul>
                <div className='w-full'>
                    <a href="#" className="w-full bottom-0 mb-4 absolute bottom-0 flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                    <span className="text-lg font-medium"><BiLogOutCircle className='inline rotate-180 mr-2 text-3xl'/>Logout</span>
                    </a>
                </div>                
            </div>
            </div>
        </div>
        <div className='col-span-10 w-100 relative'>
            <div className='p-8'>
                <div className='text-xs'>
                    <p className='text-slate-500 inline'>First-level Menu / Second-level Menu /</p> Current Page
                </div>
                <div className='flex flex-row justify-between pt-4 pr-8'>
                    <div className='text-xl font-semibold'>
                        Songs
                    </div>
                    <div>
                        <button className='btn-secondary' onClick={() => setOpen(true)}>Add Songs</button>
                    </div>
                </div>
            </div>
            <div className='border-t-2'>
                <div className='grid grid-cols-12 m-8 mb-0 font-semibold uppercase text-xs border-b-2 p-4'>
                    <div className='col-span-5'>
                        Song name
                    </div>
                    <div className='col-span-2'>
                        source
                    </div>
                    <div className='col-span-2'>
                        added on
                    </div>
                    <div className='col-span-2'>
                        
                    </div>
                    <div className='col-span-1'>
                        
                    </div>
                </div>
                {list
                    .map((item, index) => (
                       <SongList item={item} index={index} setCurrentURL={setCurrentURL} setCurrentCover={setCurrentCover} setCurrentName={setCurrentName}/>
                    ))}
            </div>
            <div className=''>
                <div className='absolute bottom-0 w-full'>
                    <AudioPlayer src={currentURL}
                    layout="horizontal"
                    customVolumeControls={[]}
                    customAdditionalControls={[]}
                    showDownloadProgress={false}
                    customProgressBarSection={
                        [
                          <div>
                            <img src={currentCover} alt="" className='w-12 h-12 inline mr-4'/>
                          </div>,
                          <div className='font-bold'>
                            {currentName}
                          </div>,
                          RHAP_UI.PROGRESS_BAR
                        ]
                      }
                    customIcons={{
                        play: <TbPlayerPlay className='text-[2rem] pl-1 text-black'/>,
                        pause:<TbPlayerPause className='text-[2rem] pl-1 text-black'/>,
                        rewind: <TbPlayerSkipBack className='text-[2rem] text-black'/>,
                        forward: <TbPlayerSkipForward className='text-[2rem] text-black'/>}}/>
                </div>
            </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
                <div className="w-60 sm:w-80 md:w-[40rem] lg:w-[50rem]">
                    <div className='p-6'>
                        <div className='text-sm'>
                            <div>Song Name</div>
                            <input className='input' placeholder='Song name'/>
                        </div>
                        <div className='text-sm pt-6'>
                            <div>Song Link</div>
                            <input className='input' placeholder='URL'/>
                        </div>
                        <div className='text-sm pt-6'>
                            <div>Song Source</div>
                            <input className='input' placeholder='Source name'/>
                        </div>
                        <div className='text-sm pt-6'>
                            <label for="actual-btn" className='cursor-pointer p-1 border-2 rounded-sm w-[16rem] flex items-center justify-center'><GrFormUpload className='text-2xl pr-2'/>
                                Click to Upload Profile Thumbnail
                            </label>
                            <div className='p-2 mt-2 border-2 flex items-center'>
                                <img className='w-14 h-14' alt="" src={file} />
                                <div className=''>{`${fileName}`}</div>
                                <div className='absolute right-20'><AiOutlineDelete className=' text-slate-500 text-lg cursor-pointer hover:text-slate-700'/></div>
                            </div>
                            <input type="file" id="actual-btn" onChange={handleChange} hidden/>
                        </div>
                        <div className='text-slate-400 text-xs pt-4'>
                            Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels
                        </div>
                    </div>                
                </div>
                <div className='border-t-2'>
                    <div className='float-right text-xs my-0'>
                        <button className='m-4 mr-0 mb-0 border-2 p-1 rounded-sm w-14' onClick={() => setOpen(false)}>Cancel</button>
                        <button className='m-4 mb-0 p-1 text-white border-2 w-14 bg-[#1890FF] rounded-sm'>Add</button>
                    </div>
                </div>
            </Modal>       
    </div>
  )
}

export default Playlist