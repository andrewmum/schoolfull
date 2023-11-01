<script lang="ts">
    import type { PageData } from './$types';
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import { db } from '$lib/firebase';
    import { collection, doc, updateDoc } from 'firebase/firestore';
    import { fade } from 'svelte/transition';

    import StudentModal from "$lib/components/StudentModalForm.svelte"
    import StudentModalForm from '$lib/components/StudentModalForm.svelte';
    export let data: PageData;

    let readyForChange = false;
    
    let focused : string = "";
    let success: string = "";

    async function saveStudentData(studentId:string){
        let value = (document.getElementById("student_" + studentId + "_value") as HTMLInputElement).value
        if(value){
            await updateDoc(doc(db, "students", studentId), {bank:value})
            success = focused;
            focused = "";
            debugger;
        }
    }
    function showStudentDetail(element:any){
        element.showModal();
    }
</script>

<svelte:head>
    <title>@{data.teacher} Students</title>
    <meta name="description" />
</svelte:head>
  
  
  <main class="prose text-center mx-auto mt-8">
    <AuthCheck>

    <h2 class="text-4xl pb-4">
      Your Students!
    </h2>
  
    <div class="flex flex-wrap gap-4 mb-4">
        {#each data.students as student }
            <div class="card bg-base-100 shadow-xl indicator w-2/5 " id="student_{student.id}">
                <div class="card-body text-zinc-950">
                    <h2 class="card-title text-center">{student.data.firstName} {student.data.lastName}</h2>
                    <div class="join">
                        <button class="btn join-item rounded-r-full" >Bank</button>
                        <input class="input input-bordered join-item overflow-auto" id="student_{student.id}_value" type="number" on:focus={() => focused = student.id} value="{student.data.bank}"/>
                    </div>
                    {#if focused == student.id}
                        {success = ""}
                        <button class="btn btn-outline" on:click={() => saveStudentData(student.id)}>Save Data</button>
                    {/if}
                    {#if success == student.id}
                        <button transition:fade class="btn btn-success">Success</button>
                    {/if}
                    <button class="btn" on:click={()=>showStudentDetail(document.getElementById('my_modal_2_' + student.id))}>Student Detail</button>
                    <StudentModalForm student={student} />
                </div>

            </div>
        {/each}
    </div>

</AuthCheck>
  </main>
