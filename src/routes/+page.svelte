<script lang="ts">
  import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { auth } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        if(user){
            goto('/dashboard/username')
        }
    }
  </script>
<div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl" aria-disabled href="/dashboard">schoolful</a>
    </div>
    {#if $user}
        <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/dashboard/username">Username</a></li>
            <li><a href="/dashboard/students">Add a Student</a></li>
            <li><a href="/dashboard/student-list/{$userData?.username}">List</a></li>
        </ul>
        </div>
    {/if}
    <div class="navbar-end">
      {#if $user}
        <button class="btn btn-warning" on:click={() => signOut(auth)}>Sign out</button>
      {:else}
        <button class="btn btn-primary" on:click={signInWithGoogle}>Get started</button>
      {/if}
    </div>
  </div>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div>
        <h1 class="text-5xl font-bold">Schoolful: Your Ultimate Classroom Companion</h1>
        <p class="py-6">Empowering Teachers with Effective Tools and Sparking Student Joy Through Fun and Engaging Activities</p>
        <button class="btn btn-primary" on:click={signInWithGoogle}>Get started</button>
      </div>
    </div>
  </div>