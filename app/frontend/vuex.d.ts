// vuex.d.ts
import { Store } from 'vuex'
declare module 'vuex' {
  export * from 'vuex/types'
  export { createStore } from 'vuex-ts-enhanced'
}

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    coaches:  Coach[];
    currentCoach:  Coach | null;
    currentTrainer: Trainer | null;
    currentWorkout:  Workout | null;
    error: null | string;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
