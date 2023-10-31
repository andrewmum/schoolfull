<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData} from "$lib/firebase";
    import { getDatabase, set } from "firebase/database";
    import { doc, getDoc, writeBatch} from "firebase/firestore";
    import { ref } from "firebase/storage";

    let firstName = "";
    let bank = 0;
    let lastName = "";
    let key = firstName + '_' + lastName
    let loading = false;
    let isAvailable = false;
    let uuid  = crypto.randomUUID();

    async function createStudent() {
      const batch = writeBatch(db);
      batch.set(doc(db, "students", uuid), { 
            bank:bank,
           firstName: firstName,
           lastName: lastName,
           teacher: $userData?.username
           });

      await batch.commit();

      isAvailable = false;
    }



  
</script>



<AuthCheck>
  <!-- <form class="w-2/5 text-zinc-950" on:submit|preventDefault={createStudent}>
      <div class="join">
        <div>
          <div>
            <input class="input input-bordered join-item" type="text" bind:value={firstName}/>
          </div>
        </div>
        <div class="indicator">
          <span class="btn join-item" aria-disabled="true">First Name</span>
        </div>
      </div>

      <div class="join">
        <div>
          <div>
            <input class="input input-bordered join-item" type="text" bind:value={lastName}/>
          </div>
        </div>
        <div class="indicator">
          <span class="btn join-item" aria-disabled="true">Last Name</span>
        </div>
      </div>

      <div class="join">
        <div>
          <div>
            <input class="input input-bordered join-item" type="number" bind:value={bank}/>
          </div>
        </div>
        <div class="indicator">
          <span class="btn join-item" aria-disabled="true">Bank</span>
        </div>
      </div>

      <div class="my-4 min-h-16 px-8 w-full">

          <span class="btn btn-outline btn-info">Add Student @{firstName} </span>
      </div>
    </form> -->
      <form class="w-full max-w-sm text-black" on:submit|preventDefault={createStudent}>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Full Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="input input-bordered join-item" type="text" bind:value={firstName}/>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Last Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="input input-bordered join-item" type="text" bind:value={lastName}/>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Bank
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="input input-bordered join-item" type="number" bind:value={bank}/>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Add Student  @{firstName}
            </button>
          </div>
        </div>
      </form>



</AuthCheck>
