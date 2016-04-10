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

    handleNameChange: function(e) {
      this.setState({name: e.target.value});
    },
    handleAdoptionStatusChange: function(e) {
      this.setState({adoption_status: e.target.value});
    },
    handleGenderChange: function(e) {
      this.setState({gender: e.target.value});
    },
    handleAgeChange: function(e) {
      this.setState({date_of_birth: e.target.value});
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

    handleSubmit: function(e) {
      e.preventDefault();

      var name = this.state.name;
      var shelter_id = this.props.shelterId;
      var adoption_status = this.state.adoption_status;
      var gender = this.state.gender;
      var date_of_birth = this.state.date_of_birth;
      var breed_id = this.state.breed_id;
      var animal_type = this.state.animal_type;
      var color = this.state.color;
      var size = this.state.size;

      this.props.onAnimalsFilterSubmit(
        {
          animal: {
            shelter_id: shelter_id,
            name: name,
            adoption_status: adoption_status,
            gender: gender,
            date_of_birth: date_of_birth,
            breed_id: breed_id,
            shelter_id: shelter_id,
            animal_type: animal_type,
            color: color,
            size: size
          }
        }
      );
    },

    render: function() {
      return (
        <div id='animals-filter'>
          <p className="filter-title">Add animal</p>

          <form onSubmit={this.handleSubmit}>
            <label>name:</label>
            <input type="text" onChange={this.handleNameChange}/>

            <label>adoption_status:</label>
            <select onChange={this.handleAdoptionStatusChange}>
              <option></option>
              <option value="today">arrived today</option>
              <option value="preparation">preparation for adoption</option>
              <option value="ready">ready for adoption</option>
              <option value="home">found home!</option>
            </select>

            <label>gender:</label>
            <select onChange={this.handleGenderChange}>
              <option></option>
              <option value="f">female</option>
              <option value="m">male</option>
            </select>

            <label>date_of_birth:</label>
            <input type="date" placeholder="YYYY-MM-DD" onChange={this.handleAgeChange}/>

            <label>animal_type:</label>
            <select onChange={this.handleAnimalTypeChange}>
              <option></option>
              <option value="cat">cat</option>
              <option value="dog">dog</option>
              <option value="rat">rat</option>
            </select>

            <label>color:</label>
            <select onChange={this.handleColorChange}>
              <option></option>
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="brown">brown</option>
              <option value="gray">gray</option>
            </select>

            <label>size:</label>
            <select onChange={this.handleSizeChange}>
              <option></option>
              <option value="s">small</option>
              <option value="m">medium</option>
              <option value="l">large</option>
            </select>

            <label>breed:</label>
            <select onChange={this.handleBreedNameChange}>
              <option></option>
              <option value="1">Egyptian Werewolf in Armor</option>
              <option value="2">Star Cat</option>
              <option value="3">Domestic Cat</option>
              <option value="4">Lab Rat</option>
              <option value="5">Just A Doge</option>
            </select>

            <br /><br />
            <input type="submit" value="Add" />
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
      this.handleAnimalsFilterSubmit({animal: {shelter_id: this.props.shelterId}});
    },

    handleAnimalsFilterSubmit: function(data) {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
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
          <AnimalsFilter onAnimalsFilterSubmit={this.handleAnimalsFilterSubmit} shelterId={this.props.shelterId}/>
          <AnimalsList data={this.state.data}/>
        </div>
      );
    }
  });

  var addanimalform = document.getElementById('addanimalform');

  if(addanimalform) {
    var shelterId = addanimalform.getAttribute('data-shelter-id');

    ReactDOM.render(
      <AnimalsFilterBox url="/api/shelter-animals" shelterId={shelterId}/>,
      addanimalform
    );
  }

});
