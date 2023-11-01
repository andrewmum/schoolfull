<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { auth } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
    }
    async function signOutAndRedirect(){
      signOut(auth)
      goto('/');
    }
  </script>
  
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl" aria-disabled href="/dashboard">schoolful</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/dashboard/username">Username</a></li>
        <li><a href="/dashboard/students">Add a Student</a></li>
        <li><a href="/dashboard/student-list/{$userData?.username}">List</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      {#if $user}
        <button class="btn btn-warning" on:click={signOutAndRedirect}>Sign out</button>
      {:else}
        <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
      {/if}
    </div>
  </div>
  <AnimatedRoute>
    <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
        <div class="card-body items-center text-center">
        <slot />
        </div>
    </main>
</AnimatedRoute>