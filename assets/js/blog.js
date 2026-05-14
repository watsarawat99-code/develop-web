async function loadBlogs() {

    try {

        const response = await fetch('./assets/data/blog.json');

        console.log(response);

        const posts = await response.json();

        console.log(posts);

        const container = document.getElementById('blog-grid');

        container.innerHTML = '';

        posts.forEach(post => {

            container.innerHTML += `
                
                <article class="bg-white p-5 rounded-3xl shadow flex flex-col">
                
                    <img src="${post.image}" 
                        class="w-full h-52 object-cover rounded-2xl">
                
                    <h2 class="text-2xl font-bold mt-5">
                        ${post.title}
                    </h2>
                
                    <p class="mt-3 text-slate-600">
                        ${post.description}
                    </p>
                
                    <a href="./blogs/${post.slug}.html"
                        class="mt-5 inline-flex items-center gap-2 text-blue-600 font-semibold">
                
                        อ่านต่อ →
                
                    </a>
                
                </article>
                
                `;

        });

    }

    catch(error) {

        console.error(error);

        document.getElementById('blog-grid').innerHTML = `

            <div class="text-red-500 text-xl font-bold">
                โหลดบทความไม่สำเร็จ
            </div>

        `;

    }

}

loadBlogs();