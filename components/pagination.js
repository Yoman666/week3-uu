export default{
    props: ['pages','get_product'],
    template: `<nav aria-label="Page navigation example">
    <!-- 直接檢視外層是否有傳送資料到內層{{pages}}-->
                    <ul class="pagination">
                    <li class="page-item" :class="{disabled: !pages.has_pre}">
                        <a class="page-link" href="#" aria-label="Previous" @click.prevent="get_product(pages.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    <li class="page-item" :class="{active: item === pages.current_page}"
                        v-for="(item) in pages.total_pages" :key="item+'item'">
                    <a class="page-link" href="#" @click.prevent="get_product(item)">{{item}}</a>
                    </li>

                    <li class="page-item" :class="{disabled: !pages.has_next}">
                        <a class="page-link" href="#" aria-label="Next"  @click.prevent="get_product(pages.current_page+1)">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    </ul>
                </nav>`,
}