$(document).ready(function() {

  var PetsList = React.createClass({
    render: function() {
      var  filteredPets  = this.props.data.map(function(pet) {
        return (
          <div className='pet' key={pet.id}>
            <p className='pet-name'><b>{pet.name}</b></p>
            <p>gender: {pet.gender}</p>
            <p>type: {pet.pet_type}</p>
            <p>age: {getAge(pet.date_of_birth)}</p>
          </div>
        );
      });

      return (
        <div id='pets-list'>
          {filteredPets}
        </div>
      );
    }
  });

  var PetsFilter = React.createClass({
    getInitialState: function() {
      return {pet_type: 'all'};
    },

    handlePetTypeChange: function(e) {
      this.setState({pet_type: e.target.value});
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var pet_type = this.state.pet_type;
      this.props.onPetsFilterSubmit({pet_type: pet_type});
    },

    render: function() {
      return (
        <div id='pets-filter'>
          <form className="pets-filter-form" onSubmit={this.handleSubmit}>
            <select onChange={this.handlePetTypeChange}>
              <option value="all">all</option>
              <option value="cat">cats</option>
              <option value="dog">dogs</option>
              <option value="other">other</option>
            </select>
            <input type="submit" value="Filter" />
          </form>
        </div>
      );
    }
  });

  var PetsFilterBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },

    handlePetsFilterSubmit: function(pet_type) {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'GET',
        data: pet_type,
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
          <p>Filter pets</p>
          <PetsFilter onPetsFilterSubmit={this.handlePetsFilterSubmit}/>
          <PetsList data={this.state.data} />
        </div>
      );
    }
  });


  ReactDOM.render(
    <PetsFilterBox url="/api/pets.json" />,
    document.getElementById('app')
  );

});
