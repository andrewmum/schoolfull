
<script lang="ts">
    import { db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";

    export let student:any
    
    let firstName = student.data.firstName
    let lastName = student.data.lastName
    let password = student.data.firstName
    let bank = student.data.bank

    
    async function updateStudent(){
        if(student.id){
            debugger
            await updateDoc(doc(db, "students", student.id),
                {
                    bank:bank,
                    firstName:firstName,
                    lastName:lastName
                }
            )
          
        }
    }



</script>

<dialog id="my_modal_2_{student.id}" class="modal">
    <div class="modal-box text-black">
        <div class="pb-2">
            <h3 class="font-bold text-lg">{student.data.firstName}'s details</h3>
        </div>
        <form class="modal-backdrop"  >
            <div class="md:flex md:items-center ">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    First Name
                    </label>
                </div>
                <div class="md:w-2/3 text-black">
                    <input class="input input-bordered join-item" type="text" bind:value={firstName} placeholder="{firstName}" />
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Last Name
                    </label>
                </div>
                <div class="md:w-2/3 text-black">
                    <input class="input input-bordered join-item" type="text" bind:value={lastName}/>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Password
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input class="input input-bordered join-item text-black" type="text" bind:value={password}/>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Bank
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input class="input input-bordered join-item text-black" type="number" bind:value={bank}/>
                </div>
            </div>
            <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                    <button class="btn shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" on:click={() => updateStudent}>
                        Update student {firstName}
                    </button>
                </div>
            </div>
        </form>

    </div>
</dialog>