$(function() {

  var AnimalsList = React.createClass({
    render: function() {
      var  filteredAnimals = this.props.data.map(function(animal) {
        return (
          <div className='animal' key={animal.id}>
            <p className='animal-name'><b>{animal.name}</b></p>
            <p>gender: {animal.gender}</p>
            <p>status: {animal.adoption_status}</p>
            <p>age: {getAge(animal.date_of_birth)}</p>
          </div>
        );
      });

      return (
        <div id='animals-list'>
          {filteredAnimals}
        </div>
      );
    }
  });

  var AnimalsFilter = React.createClass({
    getInitialState: function() {
      return {};
    },

    handleAdoptionStatusChange: function(e) {
      this.setState({adoption_status: e.target.value});
    },
    handleGenderChange: function(e) {
      this.setState({gender: e.target.value});
    },
    handleAgeChange: function(e) {
      this.setState({age: e.target.value});
    },
    handleBreedNameChange: function(e) {
      this.setState({breed_id: e.target.value});
    },
    handleAnimalTypeChange: function(e) {
      this.setState({animal_type: e.target.value});
    },
    handleColorChange: function(e) {
      this.setState({color: e.target.value});
    },
    handleSizeChange: function(e) {
      this.setState({size: e.target.value});
    },
    handleCityChange: function(e) {
      this.setState({city: e.target.value});
    },


    handleSubmit: function(e) {
      e.preventDefault();
      var adoption_status = this.state.adoption_status;
      var gender = this.state.gender;
      var age = this.state.age;
      var breed_id = this.state.breed_id;
      var animal_type = this.state.animal_type;
      var color = this.state.color;
      var size = this.state.size;
      var city = this.state.city;

      this.props.onAnimalsFilterSubmit(
        {
          animals: {
            adoption_status: adoption_status,
            gender: gender,
            age: age,
            breed_id: breed_id,
            color: color,
            size: size },
          shelters: {
            city: city
          },
          breeds: {
            animal_type: animal_type
          }
        }
      );
    },

    render: function() {
      return (
        <div id='animals-filter'>
          <p className="filter-title">Filter animals</p>

          <form className="animals-filter-form" onSubmit={this.handleSubmit}>

            <label>adoption_status:</label>
            <select onChange={this.handleAdoptionStatusChange}>
              <option value="all">all</option>
              <option value="today">arrived today</option>
              <option value="preparation">preparation for adoption</option>
              <option value="ready">ready for adoption</option>
              <option value="home">found home!</option>
            </select>

            <label>gender:</label>
            <select onChange={this.handleGenderChange}>
              <option value="all">all</option>
              <option value="f">female</option>
              <option value="m">male</option>
            </select>

            <label>age:</label>
            <select onChange={this.handleAgeChange}>
              <option value="all">all</option>
              <option value="puppy">less than 1</option>
              <option value="young">between 1 and 5</option>
              <option value="middle">between 5 and 8</option>
              <option value="old">more than 8</option>
            </select>


            <label>animal_type:</label>
            <select onChange={this.handleAnimalTypeChange}>
              <option value="all">all</option>
              <option value="cat">cats</option>
              <option value="dog">dogs</option>
              <option value="rat">rats</option>
            </select>

            <label>color:</label>
            <select onChange={this.handleColorChange}>
              <option value="all">all</option>
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="brown">brown</option>
              <option value="gray">gray</option>
            </select>

            <label>size:</label>
            <select onChange={this.handleSizeChange}>
              <option value="all">all</option>
              <option value="s">small</option>
              <option value="m">medium</option>
              <option value="l">large</option>
            </select>

            <label>breed:</label>
            <select onChange={this.handleBreedNameChange}>
              <option value="all">all</option>
              <option value="1">Egyptian Werewolf in Armor</option>
              <option value="2">Star Cat</option>
              <option value="3">Domestic Cat</option>
              <option value="4">Lab Rat</option>
              <option value="5">Just A Doge</option>
            </select>


            <label>city:</label>
            <select onChange={this.handleCityChange}>
              <option value="all">all</option>
              <option value="bialystok">Białystok</option>
              <option value="hajnowka">Hajnówka</option>
            </select>

            <br /><br />
            <input type="submit" value="Filter" />
          </form>
        </div>
      );
    }
  });

  var AnimalsFilterBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },

    componentDidMount: function() {
      this.handleAnimalsFilterSubmit();
    },

    handleAnimalsFilterSubmit: function(data) {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'GET',
        data: data,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    render: function() {
      return (
        <div>
          <AnimalsFilter onAnimalsFilterSubmit={this.handleAnimalsFilterSubmit}/>
          <AnimalsList data={this.state.data} />
        </div>
      );
    }
  });

  var app = document.getElementById('app');

  if(app) {
    ReactDOM.render(
      <AnimalsFilterBox url="/api/animals.json" />,
      app
    );
  }

});
