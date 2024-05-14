This is a demo of Tafy, a generative AI meal planning and recipe generation service.

===

![Tafy Demo](https://github.com/tafy-io/tafy-demo/blob/a0163f16681a12cb3ca3ccc88fa1e591b9ef4063/TafyDemo-short.gif)

===

## Getting Started

### 1. install the needed package:

```bash
npm i
```

### 2. Set the required environment variables:

Copy `.env.local.example` to `.env.local` and populate the required environment
variables.

Update your `wrangler.toml` to match your use - especially paying attention to
the model that's used for image generation.

> NOTE: online research currently doesn't work due to a limitation in the response of the AI
> model.

**If you want online research to work, you only need a tavily API key, which you can obtain here: https://tavily.com/**

### 3. Run the app

```bash
npm run dev
npx wrangler dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Deploy the app

1. [Fork the repo](https://github.com/tafy-io/tafy-demo/fork)
1. `git clone <forked repo URI>`
1. Update the `wrangler.toml` with your configuration.
1. `cp env.local{.example,}`
1. Setup your repo on Cloudflare pages, registering it as a NextJS app.
1. Run `npx wrangler deploy functions/text2image.js` to deploy the worker.
1. Configure your worker on cloudflare.
1. Visit your site on cloudflare.

For additional help, please [submit an issue on GitHub](https://github.com/tafy-io/tafy-demo/issues/new/choose).

## Learn More

### Features

#### Interacting with the interface

1. Chat with the box on the right to change, update, or create a new recipe -
   go ahead, make a pizza, and make it gluten free!
1. Click the speaker icon, and enjoy listening to the soothing voice describe
   your latest creation.
1. Click on the `+` or `*` at the top of the page to add another recipe to your
   meal plan.
1. Not getting the latest recipe that was showcased on last night's episode of
   Top Chef?  Click the "Perform Research" switch to allow Tafy to hit the
   interwebs!
1. Use the arrows to navigate to previous and next recipes, or the "TAFY" logo
   to reset, and if you change your mind on just one, just hit the trash can
   to throw it in the bin.
1. Try this one: `Create 5 vegan mexican recipes that will allow me to
   reuse many of the same ingredients`
1. Now look through the recipes that you have generated, then find one and ask
   to change it in some way.  Easy as that!

#### Latest

- [x] Cloudflare Pages using NextJS and Workers AI for inference at the edge.
- [x] LangChain is used to allow for maximal extensiblity and calling
  tools in text generation tasks.
- [x] CopilotKit used for integrating and chaining tools.
- [x] Online research using Tavily.
- [x] Automatic recipe image generation.

#### Coming soon...

- [] Food Preferences LLM Tool - Don't like legumes? Never. Eat. Another. Bean.
- [] Calendar planner for meal plans, recipe storage, and fridge management
- [] Vectorize (Cloudflare) storage of recipes
- [] Food DB integrations + knowledge graph for better food pairings
- [] Grocery delivery network (requires critical mass)


### Links

To learn more about Tafy, take a look at the following resources:

- [Tafy Demo](https://tafy.recipe) - A live demo of Tafy!
- [Tafy Signup (WIP)](https://tafy.io) - The home of what will become of the meal planning
  web application.
- [GitHub](https://github.com/tafy-io) - Check out the Tafy organization GitHub repository.

### Credits

- Thanks to Cloudflare and Dev.to for the contest!  This has been fun and I'm
  hoping to build a real product from this using Cloudflare's infrastructure.
- Thanks to the folks at CopilotKit for their awesome support and really awesome
  demo that formed the foundation for this demo!
- Additional thanks to the other Cloudflare/dev.to *contestants* for helping me get passed my
  issues.

