  new Vue({
	el: '#app',
	data: {
	  cards: [],
	  displayedCards: [],
	  cart: [],
	  cartId: '',
	  cartOpen: false,
	  loading: false,
	  page: 1,
	  filters: {
		search: '',
		minPrice: null,
		maxPrice: null,
		conditions: [],
		languages: []
	  },
	  sortBy: 'name_asc',
	  conditions: ['Mint', 'Near Mint', 'Excellent', 'Good', 'Played'],
	  languages: ['English', 'Japanese', 'German', 'French', 'Italian', 'Spanish']
	},
	computed: {
	  cartItemCount() {
		return this.cart.length;
	  },
	  cartTotal() {
		return this.cart.reduce((total, item) => total + item.price, 0);
	  }
	},
	methods: {
	  async fetchCards() {
		this.loading = true;
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		const newCards = Array.from({ length: 30 }, (_, i) => ({
		  id: this.cards.length + i + 1,
		  name: `Card ${this.cards.length + i + 1}`,
		  price: Math.random() * 100 + 1,
		  image: `https://picsum.photos/200/300?random=${this.cards.length + i + 1}`,
		  condition: this.conditions[Math.floor(Math.random() * this.conditions.length)],
		  language: this.languages[Math.floor(Math.random() * this.languages.length)]
		}));
		this.cards = [...this.cards, ...newCards];
		this.applyFilters();
		this.loading = false;
	  },
	  applyFilters() {
		let filteredCards = this.cards.filter(card => {
		  if (this.filters.search && !card.name.toLowerCase().includes(this.filters.search.toLowerCase())) return false;
		  if (this.filters.minPrice && card.price < this.filters.minPrice) return false;
		  if (this.filters.maxPrice && card.price > this.filters.maxPrice) return false;
		  if (this.filters.conditions.length && !this.filters.conditions.includes(card.condition)) return false;
		  if (this.filters.languages.length && !this.filters.languages.includes(card.language)) return false;
		  return true;
		});

		// Apply sorting
		switch (this.sortBy) {
		  case 'name_asc':
			filteredCards.sort((a, b) => a.name.localeCompare(b.name));
			break;
		  case 'name_desc':
			filteredCards.sort((a, b) => b.name.localeCompare(a.name));
			break;
		  case 'price_asc':
			filteredCards.sort((a, b) => a.price - b.price);
			break;
		  case 'price_desc':
			filteredCards.sort((a, b) => b.price - a.price);
			break;
		}

		this.displayedCards = filteredCards;
	  },
	  addToCart(card) {
		this.cart.push(card);
		this.generateCartId();
	  },
	  removeFromCart(index) {
		this.cart.splice(index, 1);
		this.generateCartId();
	  },
	  toggleCart() {
		this.cartOpen = !this.cartOpen;
	  },
	  generateCartId() {
		const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(2, 16);
		const random = Math.random().toString(36).substring(2, 6);
		this.cartId = random + timestamp;
	  },
	  sendCartAsCsv() {
		// Implement CSV generation and email sending logic here
		console.log('Sending cart as CSV to tcgcollection2@gmail.com');
	  },
	  sendCartAsPdf() {
		// Implement PDF generation and email sending logic here
		console.log('Sending cart as PDF to tcgcollection2@gmail.com');
	  },
	  handleScroll() {
		const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
		if (bottomOfWindow && !this.loading) {
		  this.page++;
		  this.fetchCards();
		}
	  }
	},
	mounted() {
	  this.fetchCards();
	  window.addEventListener('scroll', this.handleScroll);
	},
	beforeDestroy() {
	  window.removeEventListener('scroll', this.handleScroll);
	}
  });
</script>