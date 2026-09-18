import React, { useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { RxDropdownMenu } from "react-icons/rx";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiSolidDownArrowCircle } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import SubSectionModel from "./SubSectionModal"
import { deleteSection, deleteSubSection } from '../../../../services/opertions/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';


const NestedView = ({handleChangeEditSectionName}) => {
 
 const {course} = useSelector((state)=>state.course);
 const {token}= useSelector((state)=>state.auth);
 const dispatch= useDispatch()
 
 const [addSubSection, setAddSubSection]= useState(null);
 const [viewSubSection, setviewSubSection]= useState(null);
 const [editSubSection, setEditSubSection]= useState(null);

 const [confirmmationModel, setConfirmationModel]= useState(null); 

 const handleDeleteSection = async (sectionId) => {
   const result = await deleteSection({
     sectionId,
     courseid: course._id,
     token,
   })

   if(result){
     dispatch(setCourse(result))
   }

   setConfirmationModel(null);
 }

 const handleDeleteSubSection = async (subSectionId, sectionId) => {
   const result = await deleteSubSection({
     subSectionId,
     sectionId,
     token
   });

   if(result){
    const updatedCourseContent= course.courseContent.map((section)=>section._id===sectionId? result :section);
    const updatedCourse={...course,courseContent:updatedCourseContent};
     dispatch(setCourse(updatedCourse));
   }

   setConfirmationModel(null)
 }

 return (
   <div className='rounded-lg bg-richblack-700 p-6'>
     <div>
       {course?.courseContent?.map((section) => (
         <details key={section._id} className='border-b border-richblack-600'>
           
           <summary className='flex cursor-pointer items-center justify-between gap-3 py-4'>
             <div className='flex items-center gap-3'>
               <RxDropdownMenu />
               <p className='text-richblack-5'>{section.sectionName}</p>
             </div>

             <div className='flex items-center gap-x-3 text-richblack-100'>
               <button
                 onClick={() =>
                   handleChangeEditSectionName(
                     section._id,
                     section.sectionName
                   )
                 }
               >
                 <MdEditSquare className='cursor-pointer' />
               </button>

               <button
                 onClick={() => {
                   setConfirmationModel({
                     text1: "Delete this Section",
                     text2: "All the lectures in the section will be deleted",
                     btn2Text: "Cancel",
                     btn1Handler: () => handleDeleteSection(section._id),
                     btn2Handler: () => setConfirmationModel(null)
                   })
                 }}
               >
                 <RiDeleteBin2Fill className='cursor-pointer' />
               </button>

               <span>|</span>

               <BiSolidDownArrowCircle className='cursor-pointer text-xl text-richblack-300' />
             </div>
           </summary>

           <div className='pb-4 pl-6'>
             {section?.subSection?.map((data) => (
               <div
                 key={data?._id}
                 onClick={() => setviewSubSection(data)}
                 className='flex cursor-pointer items-center justify-between gap-x-3 border-b border-richblack-600 py-3'
               >
                 <div className='flex items-center gap-2 text-richblack-50'>
                   <BiSolidDownArrowCircle />
                   <p>{data.title}</p>
                 </div>

                 <div className='flex items-center gap-x-3'>
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setEditSubSection({
                         ...data,
                         sectionId: section._id
                       })
                     }}
                   >
                     <MdEditSquare className='cursor-pointer text-richblack-100' />
                   </button>

                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setConfirmationModel({
                         text1: "Delete this Sub Section",
                         text2: "Selected lecture will be deleted",
                         btn2Text: "Cancel",
                         btn1Handler: () =>
                           handleDeleteSubSection(
                             data._id,
                             section._id
                           ),
                         btn2Handler: () =>
                           setConfirmationModel(null)
                       })
                     }}
                   >
                     <RiDeleteBin2Fill className='cursor-pointer text-richblack-100' />
                   </button>
                 </div>
               </div>
             ))}

             <button
               onClick={() => setAddSubSection(section._id)}
               className='mt-4 flex items-center gap-x-2 text-yellow-50 transition-all hover:text-yellow-100'
             >
               <CiCirclePlus className='text-xl' />
               <p>Add Lecture</p>
             </button>
           </div>

         </details>
       ))}
     </div>

     {addSubSection ? (
       <SubSectionModel
         modalData={addSubSection}
         setModalData={setAddSubSection}
         add={true}
       />
     ) : viewSubSection ? (
       <SubSectionModel
         modalData={viewSubSection}
         setModalData={setviewSubSection}
         view={true}
       />
     ) : editSubSection ? (
       <SubSectionModel
         modalData={editSubSection}
         setModalData={setEditSubSection}
         add={true}
       />
     ) : (
       <div></div>
     )}

     {confirmmationModel && (
       <div className='fixed inset-0 z-[1000] grid place-items-center bg-black/50 backdrop-blur-sm'>
         <div className='w-[90%] max-w-[450px] rounded-lg bg-richblack-800 p-6 shadow-xl'>
           <h2 className='text-xl font-semibold text-richblack-5'>
             {confirmmationModel.text1}
           </h2>

           <p className='mt-2 text-sm text-richblack-300'>
             {confirmmationModel.text2}
           </p>

           <div className='mt-6 flex justify-end gap-3'>
             <button
               onClick={confirmmationModel.btn2Handler}
               className='rounded-md bg-richblack-600 px-4 py-2 text-richblack-5 hover:bg-richblack-500'
             >
               {confirmmationModel.btn2Text}
             </button>

             <button
               onClick={confirmmationModel.btn1Handler}
               className='rounded-md bg-yellow-50 px-4 py-2 font-medium text-richblack-900 hover:bg-yellow-100'
             >
               Delete
             </button>
           </div>
         </div>
       </div>
     )}
   </div>
 )
}

export default NestedView