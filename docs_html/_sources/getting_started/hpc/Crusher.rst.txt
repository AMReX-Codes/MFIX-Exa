OLCF Crusher TDS
================

If this is your first time building MFIX-Exa on Joule2, please 
review the general notes below and `Basics`_ section first.

* To access Summit, you will need an
  `OLCF account <https://my.olcf.ornl.gov/account-application-new>`_
  and an RSA token. 
* The name of hte MFIX-Exa account is ``cfd122`` 
* These instructions build MFIX-Exa on the login nodes using ``-j8`` CPUs. 
  You may have to decrease this value if there is high traffic 
  or you may want to increase this value if you are on a compute 
  node interactively. 
* The cmake instructions compile to a ``build`` directory. 
  The gmake instructions compile to a ``exec`` directory. 
* For the dependencies, it is assumed that you have set the 
  following environment variables:

  .. code:: bash

     export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
     export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
     export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>
     export BOOST_INSTALL_DIR=$HOME/<path/to/my/boost-install-dir>

  to a path that you have read/write access to. 
  You will need to recall these paths later if you want to build 
  MFIX-Exa with the optional dependencies. Boost is only needed for 
  ``PrgEnv-cray``; there is a module available for ``PrgEnv-gnu``.   
* After building the ``mfix`` executable (with cmake), you can 
  build the PIC-to-DEM restarter app by executing the following command 
  in the ``build`` directory

  .. code:: bash

      cmake --build . --target pic2dem


.. warning::

   MFIX-Exa currently experiences a floating point exception 
   when running with ascent support. Make sure all of the 
   fpe traps in your inputs are off.   


Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

OLCF provides three programming environments on Crusher: 
``PrgEnv-amd``, ``PrgEnv-cray``, and ``PrgEnv-gnu``. 
We've had the most success with the latter two and only provide 
build instructions for them below. Note that in the ``PrgEnv-gnu``
env you will set different compilers if you are compiling for 
CPU only (e.g., most of the dependencies) or if you are compiling 
for the GPU with HIP-support. 

.. tabs:: 

   .. tab:: PrgEnv-cray 

      .. code:: bash 

         module purge
         module reset
         module load cmake/3.23.2
         module load cpe/22.08
         module load craype-accel-amd-gfx90a
         module load rocm/5.2.0
         module load cray-mpich/8.1.21
         module load cce/15.0.0  # must reload after rocm
         
         export MPICH_GPU_SUPPORT_ENABLED=1
         
         export CFLAGS="-I${ROCM_PATH}/include"
         export CXXFLAGS="-I${ROCM_PATH}/include"
         export LDFLAGS="-L${ROCM_PATH}/lib -lamdhip64"

   .. tab:: PrgEnv-gnu

      Modules 

      .. code:: bash 

         module purge
         module reset
         module swap PrgEnv-cray PrgEnv-gnu/8.3.3
         module load cmake/3.23.2
         module load craype-accel-amd-gfx90a
         module load cray-mpich/8.1.21
         module load rocm/5.2.0
         module load cce/14.0.2
         module load boost/1.79.0

      CPU compilers

      .. code:: bash 

         export CC=$(which cc)
         export CXX=$(which CC)
         export FC=$(which ftn)

      GPU compilers

      .. code:: bash 

         export CC=$(which hipcc)
         export CXX=$(which hipcc)
         
         export MPICH_GPU_SUPPORT_ENABLED=1    # GPU-aware MPI
         
         export CFLAGS="-I${MPICH_DIR}/include -I${ROCM_PATH}/include"
         export CXXFLAGS="-I$OLCF_BOOST_ROOT/include -I${MPICH_DIR}/include -I${ROCM_PATH}/include"
         export LDFLAGS="-L${MPICH_DIR}/lib -L${CRAY_MPICH_ROOTDIR}/gtl/lib -I${ROCM_PATH}/lib -lmpi -lmpi_gtl_hsa"
         export HIPFLAGS="--amdgpu-target=gfx90a"


Building MFIX-Exa
-----------------

The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. These instructions are currently 
only provided for ``cmake``. 

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU

      .. code:: bash

         export AMREX_AMD_ARCH=gfx90a

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DMFIX_GPU_BACKEND=HIP \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR
         
         export BOOST_HOME=$MY_INSTALL_DIR/boost            #PrgEnv-cray ONLY
         export Boost_INCLUDE_DIR="-I$BOOST_HOME/include"   #PrgEnv-cray ONLY

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../mfix
         make -j8

   .. tab:: GPU-full

      .. code:: bash
          
         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include
          
         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit
          
         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR
          
         export BOOST_HOME=$MY_INSTALL_DIR/boost            #PrgEnv-cray ONLY
         export Boost_INCLUDE_DIR="-I$BOOST_HOME/include"   #PrgEnv-cray ONLY
          
         export AMREX_AMD_ARCH=gfx90a

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=HIP \
               -DGPUS_PER_NODE=8 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../mfix
         make -j8


Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. HYPRE

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install 
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --enable-shared \
                        --with-hip \
                        --with-gpu-arch=gfx90a \
                        --enable-rocsparse \
                        --enable-rocrand \
                        --enable-unified-memory \
                        --enable-device-memory-pool \
                        --with-MPI-lib-dirs="${MPICH_DIR}/lib ${CRAY_MPICH_ROOTDIR}/gtl/lib ${ROCM_PATH}/lib" \
                        --with-MPI-libs="mpi mpi_gtl_hsa amdhip64" \
                        --with-MPI-include="${MPICH_DIR}/include {ROCM_PATH}/include"
            make -j8 install 
            popd


#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. GMP

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/gmp/gmp-6.2.1.tar.xz
      tar -xf gmp-6.2.1.tar.xz
      pushd gmp-6.2.1
      ./configure --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd


#. MPFR

   .. code:: bash

      wget https://www.mpfr.org/mpfr-current/mpfr-4.2.0.tar.gz
      tar -zxvf mpfr-4.2.0.tar.gz
      pushd mpfr-4.2.0/
      ./configure --prefix=$CSG_INSTALL_DIR \
                  --with-gmp-lib=${CSG_INSTALL_DIR}/lib \
                  --with-gmp-include=${CSG_INSTALL_DIR}/include
      make -j8 install
      popd


#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

   .. warning:: 

      For some reason, something in PEGTL does not set the experimental 
      filesytem when installing in ``PrgEnv-gnu`` (but it does in ``PrgEnv-cray``).  
      So you you have to force that manually. One hack to do so is shown below.

   Make sure that "experimental" precedes filesystem on or near lines 47 and 51 in
   ``CSG_INSTALL_DIR/include/tao/pegtl/internal/filesystem.hpp`` 

   .. code:: bash

      ...
      #include <experimental/filesystem>

      namespace TAO_PEGTL_NAMESPACE::internal
      {
      namespace filesystem = ::std::experimental::filesystem;
      ...

#. Boost 

   .. code:: bash 

      wget https://boostorg.jfrog.io/artifactory/main/release/1.81.0/source/boost_1_81_0.tar.gz
      tar -zxvf boost_1_81_0.tar.gz
      pushd boost_1_81_0/
      ./bootstrap.sh
      ./b2 install --prefix=$BOOST_INSTALL_DIR
      popd

   .. warning:: 

      Only needed for PrgEnv-cray. This appears to build with the native 
      gcc/g++ compilers, not the cray wrapped cc/CC compilers, but "it works."


#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd


#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON \
            -DVTKm_ENABLE_TESTING=OFF
      make -j8 install
      popd


#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd



Running Jobs
------------

Common Slurm commands:

* ``sinfo`` see available/allocated resources
* ``sbatch runit_cpu.sh`` submit a cpu job to the queue
* ``squeue -u USER`` check job status of user USER
* ``squeue -p PARTITION`` check job status of partition PARTITION
* ``scancel JOBID`` kill a job with id JOBID
* ``salloc -N 1 -A CFD122_crusher -J build -t 01:00:00`` grab an interactive node for an hour

Example run scripts: 

.. tabs::

   .. tab:: PrgEnv-cray

      .. code:: bash

         #!/bin/bash -l
          
         #SBATCH -A CFD122_crusher
         #SBATCH -J mfix-timing
         #SBATCH -o job_%x-%j.out
         #SBATCH -e job_%x-%j.err
         #SBATCH --threads-per-core=1
         #SBATCH --exclude=crusher[026,027,028,081,126,114,115]
         #SBATCH -t 00:05:00
         #SBATCH -N 2
          
         nodes=2
         nrs=12
         omp=1
          
         module purge
         module reset
         module load cpe/22.08
         module load craype-accel-amd-gfx90a
         module load rocm/5.2.0
         module load cray-mpich/8.1.21
         module load cce/15.0.0  # must be loaded after rocm
          
         export OMP_NUM_THREADS=$omp
         export MPICH_GPU_SUPPORT_ENABLED=1    # remove for cpu only
         #export FI_MR_CACHE_MAX_COUNT=0       # libfabric disable caching
         export FI_MR_CACHE_MONITOR=memhooks   # alt cashe monitor
         export FI_CXI_RX_MATCH_MODE=software
         export FI_CXI_REQ_BUF_SIZE=12582912
         export FI_CXI_REQ_BUF_MIN_POSTED=6
         export FI_CXI_DEFAULT_CQ_SIZE=131072
          
         srun -N $nodes -n $nrs -c1 --ntasks-per-gpu=1 --gpu-bind=closest ./mfix inputs > screen.txt
          
         #cpu: srun -N $nodes -n $nrs -c1 ./mfix inputs > screen.txt

   .. tab:: PrgEnv-gnu

      .. code:: bash

         #!/bin/bash -l
          
         #SBATCH -A CFD122_crusher
         #SBATCH -J mfix-timing
         #SBATCH -o job_%x-%j.out
         #SBATCH -e job_%x-%j.err
         #SBATCH --threads-per-core=1
         #SBATCH --exclude=crusher[026,027,028,081,126,114,115]
         #SBATCH -t 00:05:00
         #SBATCH -N 2
          
         nodes=2
         nrs=12
         omp=1
          
         module purge
         module reset
         module load cpe/22.08
         module load craype-accel-amd-gfx90a
         module load rocm/5.2.0
         module load cray-mpich/8.1.21
         module load cce/15.0.0  # must be loaded after rocm
          
         export OMP_NUM_THREADS=$omp
         export MPICH_GPU_SUPPORT_ENABLED=1    # remove for cpu only
         #export FI_MR_CACHE_MAX_COUNT=0       # libfabric disable caching
         export FI_MR_CACHE_MONITOR=memhooks   # alt cashe monitor
         export FI_CXI_RX_MATCH_MODE=software
         export FI_CXI_REQ_BUF_SIZE=12582912
         export FI_CXI_REQ_BUF_MIN_POSTED=6
         export FI_CXI_DEFAULT_CQ_SIZE=131072
          
         srun -N $nodes -n $nrs -c1 --ntasks-per-gpu=1 --gpu-bind=closest ./mfix inputs > screen.txt
          
         #cpu: srun -N $nodes -n $nrs -c1 ./mfix inputs > screen.txt



